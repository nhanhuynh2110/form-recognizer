/*
  Warnings:

  - A unique constraint covering the columns `[modelId,resultId]` on the table `AnalyzeOp` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AnalyzeOp_modelId_resultId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "AnalyzeOp_modelId_resultId_key" ON "AnalyzeOp"("modelId", "resultId");
