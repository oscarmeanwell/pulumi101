import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

export const ddbTableWhisky = new aws.dynamodb.Table(
   'ddbTable-Whiskys',
    {
      attributes: [
        {
          name: 'id',
          type: 'S',
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'id',
      name: 'ddbTable-Whiskys',
    },
    {
      protect: true,
    },
  )