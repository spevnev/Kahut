import { gql } from '@apollo/client';

const typeDefs = gql`
    type Query {
        placeholder: Boolean!
    }

    type Mutation {
        joinLobby(username: String!, code: String!): String
    }

    type Subscription {
        onGameEvent(token: String!): String!
    }
`;

export default typeDefs;
