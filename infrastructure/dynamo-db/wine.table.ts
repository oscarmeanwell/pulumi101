import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'

export const ddbTableWines= new aws.dynamodb.Table(
   'ddbTable-WInes',
    {
      attributes: [
        {
          name: 'id',
          type: 'S',
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
      hashKey: 'id',
      name: 'ddbTable-Wines',
    //   globalSecondaryIndexes: [{
    //     hashKey: 'wine',
    //     name: 'WineCreatedAtIndex',
    //     projectionType: 'ALL',
    //     rangeKey: 'createdAt',
    //   }]
    },
    {
      protect: true,
    },
  )