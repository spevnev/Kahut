import { gql } from '@apollo/client';

const typeDefs = gql`
    input IQuestion {
        id: String!
        title: String!
        index: Int!
        image: String
        type: String!
        time: Int!
        choices: [String!]!
        answers: [Int!]!
    }

    input GameInfo {
        id: String!
        image: String
        title: String!
        description: String!
    }

    type OQuestion {
        id: String!
        title: String!
        image: String
        index: Int!
        type: String!
        time: Int!
        choices: [String!]!
        answers: [Int!]!
    }

    type OGame {
        id: String!
        questions: [OQuestion!]!
        image: String
        title: String!
        description: String!
    }

    type GetLobbyResponse {
        state: String!
        players: [String!]!
    }

    type Query {
        getLobby(game_token: String!): GetLobbyResponse
        getGame(id: String!): OGame
        canEditGame(token: String!, id: String!): Boolean!
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

        editGame(token: String!, game: GameInfo!): Boolean!
        deleteGame(token: String!, id: String!): Boolean!

        editQuestion(token: String!, question: IQuestion!, id: String!): Boolean!
        deleteQuestion(token: String!, game_id: String!, question_id: String!): Boolean!
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
