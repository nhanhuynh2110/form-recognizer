import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { documentAnalysisClient } from "../config/azureClient";
import { prisma } from "../config/prisma";
const resultTest = "e4a0dece-1e22-41ef-b429-9e015bfce3f2";
const url = `https://rnd-instance.cognitiveservices.azure.com/formrecognizer/documentModels/Train-CV-Work-Education-V3-13-10-2022/analyzeResults/${resultTest}?api-version=2022-08-31`;

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
) {
  try {
    const bodyBuffer = Buffer.from(req.body);
    const modelId =
      process.env.FORM_RECOGNIZER_CUSTOM_MODEL_ID || "<custom model ID>";
    // const poller = await documentAnalysisClient.beginAnalyzeDocument(
    //   modelId,
    //   bodyBuffer
    // );

    // const operationState = poller.getOperationState();
    const resultId = new URL(
      url /* operationState.operationLocation */
    ).pathname
      .split("/")
      .pop();

    const createdate = new Date(); // operationState.createdOn

    const data = await prisma.analyzeOp.create({
      data: {
        modelId: modelId, // operationState.modelId,
        resultId: resultId,
        status: "Inprogress",
        createdDate: createdate,
        expiredDate: new Date(createdate.getTime() + 30 * 60000),
      },
    });

    return {
      body: data,
    };
  } catch (error) {
    return {
      status: error?.statusCode ?? 500,
      body: {
        message: error?.message ?? "Server error",
      },
    };
  }
};

export default httpTrigger;
