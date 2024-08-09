/*
  Warnings:

  - Added the required column `lastRetry` to the `AnalyzeOp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalyzeOp" ADD COLUMN     "lastRetry" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "AnalyzeOp_lastRetry_idx" ON "AnalyzeOp"("lastRetry");
