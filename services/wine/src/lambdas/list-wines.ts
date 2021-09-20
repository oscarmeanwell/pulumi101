import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


export const handler: APIGatewayProxyHandler = async (
  event,
  context,
  callback,
): Promise<APIGatewayProxyResult> => {
  return {body: 'Test', statusCode: 200}
}