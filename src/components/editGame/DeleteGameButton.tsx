import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookies';
import Button from '../Button';

const deleteGameMutation = gql`
    mutation deleteGame($id: String!, $token: String!) {
        deleteGame(id: $id, token: $token)
    }
`;

const CLICKS_REQUIRED = 3;

const DeleteGameButton: FunctionComponent<{ gameId: string }> = ({ gameId }) => {
    const router = useRouter();
    const [deleteGame] = useMutation(deleteGameMutation);
    const [counter, setCounter] = useState(CLICKS_REQUIRED);

    useEffect(() => {
        if (counter === 0) deleteGame({ variables: { id: gameId, token: getCookie('token') } }).then(() => router.push('/games'));
    }, [counter]);

    return (
        <Button onClick={() => setCounter(counter - 1)} style={{ width: 'fit-content' }}>
            {counter === CLICKS_REQUIRED ? 'Delete Game' : counter <= 0 ? 'Deleting...' : `${counter} click${counter > 1 ? 's' : ''} until Deletion`}
        </Button>
    );
};

export default DeleteGameButton;
