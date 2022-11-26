import { GetServerSideProps, NextPage } from 'next';
import { useRef, useState } from 'react';
import Header from '../../components/Header';
import Game from '../../types/game';
import Question from '../../types/question';
import useDebounce from '../../hooks/useDebounce';
import useWarning from '../../hooks/useWarning';
import GeneralInfo from '../../components/editGame/GeneralInfo';
import Questions from '../../components/editGame/Questions';
import { gql, useMutation } from '@apollo/client';
import createApolloClient from '../../graphql/apolloClient';
import { getCookie } from '../../utils/cookies';
import { areGamesEqual, areQuestionsEqual } from '../../utils/compareTypes';

const GET_GAME = gql`
    query getGame($id: String!) {
        getGame(id: $id) {
            image
            title
            description
            id
            questions {
                id
                index
                title
                image
                type
                time
                choices
                answers
            }
        }
    }
`;

const CAN_EDIT_GAME = gql`
    query canEditGame($id: String!, $token: String!) {
        canEditGame(id: $id, token: $token)
    }
`;

const EDIT_GAME = gql`
    mutation editGame($game: GameInfo!, $token: String!) {
        editGame(game: $game, token: $token)
    }
`;

const EDIT_QUESTION = gql`
    mutation editQuestion($question: IQuestion!, $token: String!, $id: String!) {
        editQuestion(token: $token, question: $question, id: $id)
    }
`;

const DELETE_QUESTION = gql`
    mutation deleteQuestion($question_id: String!, $game_id: String!, $token: String!) {
        deleteQuestion(token: $token, question_id: $question_id, game_id: $game_id)
    }
`;

type Props = {
    game: Game;
    isNew: boolean;
};

const EditGame: NextPage<Props> = ({ game: _game, isNew }) => {
    const setIsSafeToLeave = useWarning('You have unsaved changes!');

    const [editGame] = useMutation(EDIT_GAME);
    const [editQuestion] = useMutation(EDIT_QUESTION);
    const [deleteQuestion] = useMutation(DELETE_QUESTION);

    const prevGameRef = useRef<Game | undefined>(isNew ? undefined : _game);
    const [game, _setGame] = useState(_game);
    const setGame = useDebounce<Game>(
        async game => {
            const prevGame = prevGameRef.current;
            const token = getCookie('token');

            if (game.image && prevGame?.image !== game.image) {
                const res = await fetch(`${location.origin}/api/uploadImage`, { method: 'POST', body: game.image });
                const { url } = await res.json();
                game.image = url;
            }

            if (!areGamesEqual(prevGame, game)) await editGame({ variables: { token, game: { ...game, questions: undefined, __typename: undefined } } });

            const idToQuestion: { [key: string]: Question } = {};
            if (prevGame?.questions) prevGame.questions.forEach(question => (idToQuestion[question.id] = question));

            await Promise.all(
                game.questions
                    .filter(question => {
                        const areEqual = areQuestionsEqual(idToQuestion[question.id], question);
                        delete idToQuestion[question.id];

                        return !areEqual;
                    })
                    .map(question => editQuestion({ variables: { token, question: { ...question, __typename: undefined }, id: game.id } }))
            );

            const deletedQuestions = Object.values(idToQuestion);
            await Promise.all(deletedQuestions.map(({ id }) => deleteQuestion({ variables: { token, question_id: id, game_id: game.id } })));

            prevGameRef.current = game;
            setIsSafeToLeave(true);
        },
        (_, cur) => {
            setIsSafeToLeave(false);
            _setGame(cur);
            return cur;
        },
        500
    );

    return (
        <>
            <Header />
            <div style={{ padding: '0 20px' }}>
                <GeneralInfo game={game} setGame={setGame} />
                <Questions game={game} setGame={setGame} />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { id } = query;
    const token: string | undefined = req.cookies.token;
    if (typeof id !== 'string' || !token) return { notFound: true };

    const apollo = createApolloClient();

    const canEditGameRes = await apollo.query({ query: CAN_EDIT_GAME, variables: { id, token } });
    if (!canEditGameRes.data.canEditGame) return { notFound: true };

    const getGameRes = await apollo.query({ query: GET_GAME, variables: { id } });
    const game: Game = getGameRes.data.getGame;
    if (game) return { props: { game, isNew: false } };

    const DEFAULT_GAME: Game = { title: 'New game', description: '', id, questions: [] };
    return { props: { game: DEFAULT_GAME, isNew: true } };
};

export default EditGame;
