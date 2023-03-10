import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../services/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "GET") {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: {
          include: {
            author: { select: { id: true, name: true, image: true } },
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return res.status(200).json(posts);
  } else if (method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      res.send({
        error: "You must be signed in to perform this action.",
      });
    }

    try {
      const post = await prisma.post.create({
        data: {
          ...req.body,
          author: {
            connect: { id: req.body.author },
          },
        },
      });

      return res.status(200).json(post);
    } catch (e) {
      console.error("Request error", e);

      return res.status(500).json({ error: "Error creating post" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
