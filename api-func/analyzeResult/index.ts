import { AzureFunction, Context } from "@azure/functions";
import { AnalyzeStatus } from "@prisma/client";
import { prisma } from "../config/prisma";

interface AnalyzeResult {
  /**
   * Operation status.
   */
  status: "notStarted" | "running" | "failed" | "succeeded";
  /**
   * Date and time (UTC) when the analyze operation was submitted.
   */
  createdDateTime: string;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastUpdatedDateTime: string;
  [k: string]: unknown;
}

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  try {
    const analyzeOps = await prisma.analyzeOp.findMany({
      where: {
        // expiredDate: {
        //   gt: new Date(),
        // },
        OR: [
          {
            status: AnalyzeStatus.Inprogress,
          },
          {
            status: AnalyzeStatus.Retry,
            retryCount: {
              lt: 3,
            },
            lastRetry: {
              lt: new Date(new Date().getTime() - 60000),
            },
          },
        ],
      },
    });
    console.log("analyzeOps", analyzeOps)
    Promise.allSettled(
      analyzeOps.map(async (analyze) => {
        try {
          const result: AnalyzeResult = {
            status: "succeeded",
            createdDateTime: new Date().toISOString(),
            lastUpdatedDateTime: new Date().toISOString(),
          };

          switch (result.status) {
            case "notStarted":
            case "running":
              break;
            case "failed":
              await prisma.analyzeOp.update({
                where: {
                  id: analyze.id,
                },
                data: {
                  status: AnalyzeStatus.Error,
                },
              });
              break;
            case "succeeded":
              await prisma.analyzeOp.update({
                where: {
                  id: analyze.id,
                },
                data: {
                  status: AnalyzeStatus.Compeleted,
                },
              });
              break;
          }
        } catch (error) {
          Promise.reject(error);
        }
      })
    ).then((results) => {
      results.forEach(async (el) => {
        if (el.status === "rejected") {
          await prisma.analyzeOp.update({
            where: {
              id: el.reason,
            },
            data: {
              status: AnalyzeStatus.Retry,
              retryCount: {
                increment: 1,
              },
            },
          });
        }
      });
    });
  } catch (error) {}
};

export default timerTrigger;
