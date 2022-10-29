import { gql } from '@apollo/client';

const typeDefs = gql`
    type CreateLobbyResponse {
        code: String
        token: String
    }

    type Query {
        placeholder: Boolean!
    }

    type Mutation {
        joinLobby(username: String!, code: String!, picture: String): String
        createLobby(game_id: String!, token: String!): CreateLobbyResponse!
    }

    type Subscription {
        onGameEvent(token: String!): String!
    }
`;

export default typeDefs;
