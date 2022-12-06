import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { gql } from '@apollo/client';
import jwt from 'jsonwebtoken';
import GameInfo from '../types/gameInfo';
import GameBrowser from './games';
import createApolloClient from '../graphql/apolloClient';
import User from '../types/user';

const GET_MY_GAMES = gql`
    query getMyGames($creator: String!) {
        getGames(limit: 30, creator: $creator, questionNum: -1, orderBy: "players", sortingOrder: "DESC") {
            id
            title
            description
            image
            players
            questionNum
        }
    }
`;

const UsersGames: NextPage<{ cards: GameInfo[] }> = ({ cards }) => <GameBrowser cards={cards} showMyGames={true} />;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const token = req?.cookies?.token;
    if (!token) return { notFound: 404, props: {} };
    const { email } = jwt.decode(token) as User;

    const apollo = createApolloClient();
    const { data } = await apollo.query({ query: GET_MY_GAMES, variables: { creator: email } });

    return { props: { cards: data.getGames } };
};

export default UsersGames;
