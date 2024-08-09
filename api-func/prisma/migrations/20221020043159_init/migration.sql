-- CreateEnum
CREATE TYPE "AnalyzeStatus" AS ENUM ('Inprogress', 'Compeleted', 'Error', 'Retry');

-- CreateTable
CREATE TABLE "AnalyzeOp" (
    "id" SERIAL NOT NULL,
    "modelId" TEXT NOT NULL,
    "resultId" TEXT NOT NULL,
    "status" "AnalyzeStatus" NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "expiredDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalyzeOp_pkey" PRIMARY KEY ("id")
);
