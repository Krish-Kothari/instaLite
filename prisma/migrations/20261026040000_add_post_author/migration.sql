-- Existing Post rows must be reseeded because authorId is required.
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";
ALTER TABLE "Post" DROP COLUMN "userId";
ALTER TABLE "Post" ADD COLUMN "authorId" INTEGER NOT NULL;
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey"
  FOREIGN KEY ("authorId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");

ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey"
  FOREIGN KEY ("postId") REFERENCES "Post"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "Like_postId_idx" ON "Like"("postId");
