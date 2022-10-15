import {NextApiRequest, NextApiResponse} from "next";
import apollo, {connectionPromises} from "./apollo-server";

export const config = {api: {bodyParser: false}};

let apolloHandler: (req: NextApiRequest, res: NextApiResponse) => any | undefined;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "OPTIONS") return res.end();

	if (!apolloHandler) {
		await Promise.all(connectionPromises);
		apolloHandler = apollo.createHandler({path: "/api/graphql"});
	}

	await apolloHandler(req, res);
};

export default handler;