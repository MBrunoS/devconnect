import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { email } = req.query;

  if (method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    return res.status(200).json(user);
  } else if (method === "PATCH") {
    try {
      await prisma.user.update({
        where: {
          email: email as string,
        },
        data: req.body,
      });

      return res.status(200).json({ message: "Successfully updated user" });
    } catch (e) {
      console.error("Request error", e);

      return res.status(500).json({ error: "Error updating user" });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
