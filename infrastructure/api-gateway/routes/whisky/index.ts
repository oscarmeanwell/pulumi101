import { listWhiskysLambda } from "../../../lambdas/whisky/list-whisky";
import * as awsx from '@pulumi/awsx'

export const apiGatewayWhiskys: awsx.apigateway.Route[] = [
    {
      path: '/whiskys',
      method: 'GET',
      eventHandler: listWhiskysLambda ,
      //authorizers: [endUserAuthoriser],
    },
  ]
  