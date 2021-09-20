#!/bin/bash
yarn run build
cp -rf package.json dist/
pushd dist
yarn install --production=true
# Remove aws-sdk as it is included in lambda env
rm -rf ./node_modules/aws-sdk
popd
(rm whisky-service-lambdas.zip; exit 0)
pushd dist
zip -r -1 whisky-service-lambdas.zip ./* -x '.DS_Store'
mv whisky-service-lambdas.zip ..
popd
rm -rf dist