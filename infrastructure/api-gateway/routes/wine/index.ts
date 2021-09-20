import * as awsx from '@pulumi/awsx'
import { listWinesLambda } from "../../../lambdas/wine/list-wine";

export const apiGatewayWines: awsx.apigateway.Route[] = [
    {
      path: '/wines',
      method: 'GET',
      eventHandler: listWinesLambda ,
      //authorizers: [endUserAuthoriser],
    },
  ]
  

/** Authoriser for end users */
// export const endUserAuthoriser = awsx.apigateway.getCognitoAuthorizer({
//     providerARNs: [appUsersPool.arn, adminUsersPool.arn],
//   })