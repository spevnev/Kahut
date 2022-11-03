import { gql } from '@apollo/client';

const typeDefs = gql`
    type Player {
        username: String!
        picture: String
    }

    type GameEvent {
        event: String!
        data: String!
    }

    type CreateLobbyResponse {
        code: String
        token: String
    }

    type Query {
        getPlayers(game_token: String!): [Player!]
    }

    type Mutation {
        joinLobby(username: String!, code: String!, picture: String): String
        createLobby(game_id: String!, token: String!): CreateLobbyResponse!
        startLobby(game_token: String!): Boolean!
        submitAnswer(game_token: String!, question_id: String!, answers: [Int!]!): Boolean!
    }

    type Subscription {
        onGameEvent(game_token: String!): GameEvent
    }
`;

export default typeDefs;
