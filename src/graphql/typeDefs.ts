import { gql } from '@apollo/client';

const typeDefs = gql`
    scalar Null

    type Query {
        placeholder: Null
    }

    type Mutation {
        placeholder: Null
    }

    type Subscription {
        placeholder: Null
    }
`;

export default typeDefs;
