import {PrismaClient} from "@prisma/client";

const KVS: { [key: string]: string } = {};

type ResolverContext = {
	db: PrismaClient
}

const resolvers = {
	Query: {
		get: async (_parent: any, {key}: { key: string }, {db}: ResolverContext, _info: any): Promise<string | undefined> => {
			return (await db.kvs.findUnique({where: {key}, select: {value: true}}))?.value;
		},
	},
	Mutation: {
		set: async (_parent: any, {key, value}: { key: string, value: string }, {db}: ResolverContext, _info: any): Promise<void> => {
			await db.kvs.upsert({
				create: {key, value},
				update: {value},
				where: {key},
			});
		},
	},
};

export default resolvers;