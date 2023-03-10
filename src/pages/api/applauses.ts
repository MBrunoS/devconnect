import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.send({
      error: "You must be signed in to perform this action.",
    });
  }

  const { method } = req;

  if (method === "POST") {
    try {
      await prisma.comment.update({
        where: {
          id: req.body.id,
        },
        data: {
          applauses: { increment: 1 },
        },
      });

      return res.status(200).end();
    } catch (e) {
      console.error("Request error", e);

      return res.status(500).json({ error: "Error updating applauses" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
