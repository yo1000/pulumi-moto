#!/bin/bash
cd $(dirname $0)

## Check bucket list before provisioning
echo '
########################################
 Check bucket list before provisioning
########################################
'
aws --endpoint-url=http://moto-server:5000 s3 ls

## Pulumi login to Local (file://~)
pulumi login

## Initialize pulumi project
pulumi new aws-javascript -y --force

## Resolve dependencies
npm install @pulumi/aws

## Support for initialize directory caused by `pulumi new`
cp /tmp/index.js   ./
cp /tmp/backend.js ./

## Provisioning!!!!
pulumi up -y

pulumi logout

## Check bucket list after provisioning
echo '
########################################
 Check bucket list after provisioning
########################################
'
aws --endpoint-url=http://moto-server:5000 s3 ls

