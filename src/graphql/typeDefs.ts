import { gql } from '@apollo/client';

const typeDefs = gql`
    scalar Null

    type Query {
        test: Int!
    }

    type Subscription {
        test: Int!
    }
`;

export default typeDefs;
