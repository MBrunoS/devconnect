import { Prisma } from "@prisma/client";
import { Comment } from "./Comment";

const postWithIncludes = Prisma.validator<Prisma.PostArgs>()({
  include: { author: true, comments: { include: { author: true } } },
});

export type Post = Omit<
  Prisma.PostGetPayload<typeof postWithIncludes>,
  "publishedAt"
> & {
  publishedAt: string;
  comments: Comment[];
};
