import { SSTConfig } from "sst";
import { APIStack } from "./stacks/APIStack";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.development.local" });

export default {
  config(_input) {
    return {
      name: "sst-testrail-endpoints",
      region: "us-east-1",
      cdk: {
        qualifier: "trj2111-sc",
      },
    };
  },
  stacks(app) {
    app.stack(APIStack);
  },
} satisfies SSTConfig;
