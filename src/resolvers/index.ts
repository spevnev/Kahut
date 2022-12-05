import Query from './queries';
import Mutation from './mutations';
import Subscription from './subscriptions/index';
import objects from './objects';

const resolvers = { Query, Mutation, Subscription, ...objects };

export default resolvers;
