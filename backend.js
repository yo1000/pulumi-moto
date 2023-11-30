"use strict";
const aws = require("@pulumi/aws");

const pulumiBackend = process.env.PULUMI_BACKEND_URL;

function provider() {
  return pulumiBackend === "file://~"
    ? new aws.Provider("myCustomProvider", {
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
    })
    : new aws.Provider("myDefaultProvider", {});
}

module.exports = {
  provider: provider
};

