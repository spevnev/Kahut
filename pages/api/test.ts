import type {NextApiRequest, NextApiResponse} from "next";

type Data = { string: string }

export default (req: NextApiRequest, res: NextApiResponse<Data>) => res.status(200).json({string: "Hello world!"});