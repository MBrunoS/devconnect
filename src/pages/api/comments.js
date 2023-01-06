import { prisma } from "../../services/prisma";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const comment = await prisma.comment.create({
        data: {
          ...req.body,
          post: {
            connect: { id: req.body.post },
          },
          author: {
            connect: { id: req.body.author },
          },
        },
      });

      return res.status(200).json(comment);
    } catch (e) {
      console.error("Request error", e);

      return res.status(500).json({ error: "Error creating comment" });
    }
  } else if (method === "DELETE") {
    try {
      const deleted = await prisma.comment.delete({
        where: {
          id: req.body.id,
        },
      });
      return res.status(200).json(deleted);
    } catch (e) {
      console.error("Request error", e);

      return res.status(500).json({ error: "Error deleting comment" });
    }
  }

  res.setHeader("Allow", ["POST", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
