import { Api, StackContext } from "sst/constructs";
import { envVariables } from '../packages/functions/src/variables';
import { routes } from '../packages/functions/src/routes';

export function APIStack({ stack }: StackContext) {
  const api = new Api(stack, "Api", {
    routes: routes
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
