"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

// Required only when using a mock server.
const customProvider = new aws.Provider("myCustomProvider", {
    // See below for all configurable endpoint fields.
    // https://www.pulumi.com/registry/packages/aws/api-docs/provider/#provide
    endpoints: [{
        s3: "http://moto-server:5000",
        s3api: "http://moto-server:5000",
        s3control: "http://moto-server:5000"
    }],
    // When using path styles for S3 URL format.
    // https://www.pulumi.com/registry/packages/aws/api-docs/provider/#s3usepathstyle_nodejs
    s3UsePathStyle: true,
    skipCredentialsValidation: true,
    skipMetadataApiCheck: true,
    skipRequestingAccountId: true
});

const bucket = new aws.s3.Bucket("myBucket", {}, { provider: customProvider });

// Export the name of the bucket
exports.bucketName = bucket.id;

