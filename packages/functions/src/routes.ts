import { envVariables } from "./variables"

export const routes = {
    "GET /api/getProj": {
      function: {
        handler: "packages/functions/src/testRail.getProj",
        environment: envVariables
      },
    },
    "POST /api/editCustomFields": {
      function: {
        handler: "packages/functions/src/testRail.editCustomFields",
        environment: envVariables
      },
    },
    "GET /api/updateCase": {
      function: {
        handler: "packages/functions/src/testRail.updateCase",
        environment: envVariables
      },
    },
  }