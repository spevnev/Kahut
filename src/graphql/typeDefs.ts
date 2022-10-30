import { gql } from '@apollo/client';

const typeDefs = gql`
    type GameEvent {
        event: String!
        data: String!
    }

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
        startLobby(game_token: String!): Boolean!
    }

    type Subscription {
        onGameEvent(game_token: String!): GameEvent
    }
`;

export default typeDefs;
