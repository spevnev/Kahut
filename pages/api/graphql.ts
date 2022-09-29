import {ApolloServer} from "apollo-server-micro";
import schema from "../../apollo/schema";
import {NextApiRequest, NextApiResponse} from "next";
import {ApolloServerPluginLandingPageLocalDefault} from "apollo-server-core";
import {PrismaClient} from "@prisma/client";

export const config = {api: {bodyParser: false}};

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

const servers: Promise<void>[] = [prismaClient.$connect(), apollo.start()];

let apolloHandler: (req: NextApiRequest, res: NextApiResponse) => any | undefined;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "OPTIONS") return res.end();

	if (!apolloHandler) {
		await Promise.all(servers);
		apolloHandler = apollo.createHandler({path: "/api/graphql"});
	}

	await apolloHandler(req, res);
};

export default handler;