import {gql} from "@apollo/client";

const typeDefs = gql`
    scalar Null

    type Query {
        get(key: String!): String
    }

    type Mutation {
        set(key: String!, value: String!): Null
    }
`;

export default typeDefs;