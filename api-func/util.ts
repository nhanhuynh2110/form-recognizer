export const buildLink = (instanceName, modelId, resultId) => {
  return `https://${instanceName}.cognitiveservices.azure.com/formrecognizer/documentModels/${modelId}/analyzeResults/${resultId}?api-version=2022-08-31`;
};
