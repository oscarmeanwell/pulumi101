import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

const listWinesRole = new aws.iam.Role("lambda-api-listWines_execRole", {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: ["lambda.amazonaws.com", "apigateway.amazonaws.com"],
  }),
});

const apiWineRolePolicy = new aws.iam.Policy(
  "lambda-api-listWines_execPol",
  {
    policy: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: [
            "logs:*",
            "events:*",
            "autoscaling:Describe*",
            "cloudwatch:*",
            "iam:GetPolicy",
            "iam:GetPolicyVersion",
            "iam:GetRole",
            "dynamodb:*",
            "execute-api:Invoke",
            "execute-api:ManageConnections",
          ],
          Resource: "*",
          Effect: "Allow",
        },
      ],
    },
  },
  {
    parent: listWinesRole,
  }
);

new aws.iam.PolicyAttachment(
  "lambda-api-listWines_execPolAttach",
  {
    policyArn: apiWineRolePolicy.arn,
    roles: [listWinesRole],
  },
  { parent: apiWineRolePolicy }
);

export const listWinesLambda = new aws.lambda.Function(
  "lambda-api-listWines",
  {
    code: new pulumi.asset.FileArchive(
      "services/wine/wine-service-lambdas.zip"
    ),
    handler: "services/wine/src/lambdas/list-wines.handler",
    role: listWinesRole.arn,
    runtime: "nodejs14.x",
    timeout: 120,
    environment: {
      variables: {
        test: "this",
      },
    },
    memorySize: 1024,
  },
  {
    dependsOn: [listWinesRole],
  }
);
