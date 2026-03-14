-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM (
  'FOOD',
  'TRANSPORT',
  'STAY',
  'ENTERTAINMENT',
  'UTILITIES',
  'SHOPPING',
  'OTHER'
);

-- AlterTable
ALTER TABLE "Group" ADD COLUMN "inviteCode" TEXT;

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN "category" "ExpenseCategory" NOT NULL DEFAULT 'OTHER';

-- CreateIndex
CREATE UNIQUE INDEX "Group_inviteCode_key" ON "Group"("inviteCode");
