-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT;

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");
