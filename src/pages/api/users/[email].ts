import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const { email } = req.query;

    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    return res.status(200).json(user);
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
