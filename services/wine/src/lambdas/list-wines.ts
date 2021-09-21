import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
  event,
  context,
  callback
): Promise<APIGatewayProxyResult> => {
  const responseBody = {
    demo: "Wow, its working",
    isWorkingDemo: true,
    isTimeToLaughAtOscar: false,
  };

  return {
    body: JSON.stringify(responseBody),
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
