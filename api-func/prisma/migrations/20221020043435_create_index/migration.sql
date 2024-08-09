-- CreateIndex
CREATE INDEX "AnalyzeOp_modelId_resultId_idx" ON "AnalyzeOp"("modelId", "resultId");

-- CreateIndex
CREATE INDEX "AnalyzeOp_createdDate_idx" ON "AnalyzeOp"("createdDate");

-- CreateIndex
CREATE INDEX "AnalyzeOp_expiredDate_idx" ON "AnalyzeOp"("expiredDate");
