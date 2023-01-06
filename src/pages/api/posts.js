import { prisma } from "../../services/prisma";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: {
          include: { author: { select: { name: true, avatarUrl: true } } },
        },
      },
    });

    return res.status(200).json(posts);
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
