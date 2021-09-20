// export const apiGateway = new awsx.apigateway.API(
//     getResourceName('internalRestAPI'),
//     {
//       stageName: pulumi.getStack(),
//       stageArgs: {
//         accessLogSettings: {
//           destinationArn: internalRestAPILogGroup.arn,
//           format: JSON.stringify({
//             requestId: '$context.requestId',
//             ip: '$context.identity.sourceIp',
//             caller: '$context.identity.caller',
//             user: '$context.identity.user',
//             requestTime: '$context.requestTime',
//             httpMethod: '$context.httpMethod',
//             resourcePath: '$context.resourcePath',
//             status: '$context.status',
//             protocol: '$context.protocol',
//             responseLength: '$context.responseLength',
//           }),
//         },
//         tags: getResourceTags(
//           'internal-rest-api',
//           'API Gateway for Stamp Free internal REST API',
//         ),
//       },
  
//       routes: [

//         // Catch all OPTIONS requests and return generic headers
//         // Adapted from https://www.youtube.com/watch?v=typ-AJQGKKI
//         // Solves CORS issues encountered when calling from local or remote server
//         {
//           path: '/{proxy+}',
//           method: 'OPTIONS',
//           eventHandler: async () => {
//             return {
//               body: '',
//               statusCode: 200,
//               headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Credentials': 'true',
//                 'Access-Control-Allow-Methods':
//                   'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//                 'Access-Control-Allow-Headers':
//                   'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//               },
//             }
//           },
//         },
//       ],
//     },
//   )