"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

const backend = require("./backend.js");

const bucket = new aws.s3.Bucket("myBucket", {}, { provider: backend.provider() });

// Export the name of the bucket
exports.bucketName = bucket.id;

