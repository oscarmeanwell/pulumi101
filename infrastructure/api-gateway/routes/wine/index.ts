import { listWhiskysLambda } from "../../../lambdas/whisky/list-whisky";
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
  