import { gql } from '@apollo/client';

const typeDefs = gql`
    type Query {
        placeholder: boolean
    }

    type Mutation {
        placeholder: Null
    }

    type Subscription {
        placeholder: Null
    }
`;

export default typeDefs;
