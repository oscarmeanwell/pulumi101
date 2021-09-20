import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'

export const apiGateway = new awsx.apigateway.API(
    'rest-api',
    {
      stageName: pulumi.getStack(),
      routes: [
        {
          path: '/{proxy+}',
          method: 'OPTIONS',
          eventHandler: async () => {
            return {
              body: '',
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods':
                  'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers':
                  'Origin, X-Requested-With, Content-Type, Accept, Authorization',
              },
            }
          },
        },
      ],
    },
  )