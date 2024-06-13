import { Api, StackContext } from "sst/constructs";

export function APIStack({ stack }: StackContext) {
  const api = new Api(stack, "Api", {
    routes: {
      "GET /getProj": {
        function: {
          handler: "packages/functions/src/getProj.main",
          environment: {
            TESTRAIL_USERNAME: process.env.TESTRAIL_USERNAME || "",
            TESTRAIL_PASSWORD: process.env.TESTRAIL_PASSWORD || "",
            AUTHORIZATION: process.env.AUTHORIZATION || "",
          },
        },
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
