import { AzureKeyCredential, DocumentAnalysisClient, DocumentModelAdministrationClient,  } from "@azure/ai-form-recognizer";
require('dotenv').config()
const endpoint = process.env.FORM_RECOGNIZER_ENDPOINT;
const credential = new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY || "<api key>");
export const documentAnalysisClient = new DocumentAnalysisClient(endpoint, credential);
export const modelAdminClient = new DocumentModelAdministrationClient(endpoint, credential);
 