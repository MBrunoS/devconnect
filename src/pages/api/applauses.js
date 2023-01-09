import { prisma } from "../../services/prisma";

export default async function handler(req, res) {
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

      return res.status(200).send();
    } catch (e) {
      console.error("Request error", e);

      return res.status(500).json({ error: "Error updating applauses" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
