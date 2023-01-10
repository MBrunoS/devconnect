import { Prisma } from "@prisma/client";

const commentWithIncludes = Prisma.validator<Prisma.CommentArgs>()({
  include: { author: true },
});

export type Comment = Omit<
  Prisma.CommentGetPayload<typeof commentWithIncludes>,
  "publishedAt"
> & {
  publishedAt: string;
};
