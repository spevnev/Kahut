import {PrismaClient} from "@prisma/client";

type ResolverContext = {
	db: PrismaClient
}

const resolvers = {
	Query: {},
	Mutation: {},
};

export default resolvers;