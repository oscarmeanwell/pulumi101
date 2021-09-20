import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'


const listWhiskysRole = new aws.iam.Role(
    'lambda-api-listWhiskys_execRole',
    {
      assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
        Service: ['lambda.amazonaws.com', 'apigateway.amazonaws.com'],
      }),
    },
  )
  
  // TODO: use proper permissions in PROD
  const apiProductsRolePolicy = new aws.iam.Policy(
    'lambda-api-listWhiskys_execPol',
    {
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: [
              'logs:*',
              'events:*',
              'autoscaling:Describe*',
              'cloudwatch:*',
              'iam:GetPolicy',
              'iam:GetPolicyVersion',
              'iam:GetRole',
              'dynamodb:*',
              'execute-api:Invoke',
              'execute-api:ManageConnections',
            ],
            Resource: '*',
            Effect: 'Allow',
          },
        ],
      },
    },
    {
      parent: listWhiskysRole,
    },
  )
  
  new aws.iam.PolicyAttachment(
    'lambda-api-listWhiskys_execPolAttach',
    {
      policyArn: apiProductsRolePolicy.arn,
      roles: [listWhiskysRole],
    },
    { parent: apiProductsRolePolicy },
  )
  
  export const listWhiskysLambda = new aws.lambda.Function(
    'lambda-api-listWhiskys',
    {
      code: new pulumi.asset.FileArchive(
        'services/whisky/whisky-service-lambdas.zip',
      ),
      handler: 'services/whisky/src/lambdas/list-whiskys.handler',
      role: listWhiskysRole.arn,
      runtime: 'nodejs14.x',
      timeout: 120,
      environment: {
        variables: {
         test:'this'
        },
      },
      memorySize: 1024,
    },
    {
      dependsOn: [listWhiskysRole],
    },
  )
  