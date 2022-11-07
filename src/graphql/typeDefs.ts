import { gql } from '@apollo/client';

const typeDefs = gql`
    type GetLobbyResponse {
        state: String!
        players: [String!]!
    }

    type Query {
        getLobby(game_token: String!): GetLobbyResponse
    }

    type JoinLobbyResponse {
        token: String
        error: String
    }

    type CreateLobbyResponse {
        code: String
        token: String
    }

    type Mutation {
        joinLobby(username: String!, code: String!): JoinLobbyResponse
        createLobby(game_id: String!, token: String!): CreateLobbyResponse!
        startLobby(game_token: String!): Boolean!
        submitAnswer(game_token: String!, question_id: String!, answers: [Int!]!): Boolean!
    }

    type GameEvent {
        event: String!
        data: String!
    }

    type Subscription {
        onGameEvent(game_token: String!): GameEvent
    }
`;

export default typeDefs;
