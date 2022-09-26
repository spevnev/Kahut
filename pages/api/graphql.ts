import {ApolloServer} from "apollo-server-micro";
import schema from "../../apollo/schema";
import {NextApiRequest, NextApiResponse} from "next";
import {ApolloServerPluginLandingPageLocalDefault} from "apollo-server-core";


export const config = {api: {bodyParser: false}};

const apollo = new ApolloServer({
	schema,
	cache: "bounded",
	csrfPrevention: true,
	plugins: [
		ApolloServerPluginLandingPageLocalDefault({embed: true}),
	],
});

let apolloHandler: (req: NextApiRequest, res: NextApiResponse) => any | undefined;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "OPTIONS") return res.end();

	if (!apolloHandler) {
		await apollo.start();
		apolloHandler = apollo.createHandler({path: "/api/graphql"});
	}

	await apolloHandler(req, res);
};

export default handler;