import {PrismaClient} from "@prisma/client";
import {ApolloServer} from "apollo-server-micro";
import schema from "./schema";
import {ApolloServerPluginLandingPageLocalDefault} from "apollo-server-core";

const prismaClient = new PrismaClient();
const apollo = new ApolloServer({
	schema,
	cache: "bounded",
	csrfPrevention: true,
	plugins: [
		ApolloServerPluginLandingPageLocalDefault({embed: true}),
	],
	context: {db: prismaClient},
});

export const connectionPromises: Promise<void>[] = [prismaClient.$connect(), apollo.start()];

export default apollo;