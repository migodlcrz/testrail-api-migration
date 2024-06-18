import { envVariables } from "./variables";

export const routes = {
  "GET /api/getProj": {
    function: {
      handler: "packages/functions/src/testRail.getProj",
      environment: envVariables,
    },
  },
  "POST /api/editCustomFields": {
    function: {
      handler: "packages/functions/src/testRail.editCustomFields",
      environment: envVariables,
    },
  },
  "POST /api/updateCase": {
    function: {
      handler: "packages/functions/src/testRail.updateCase",
      environment: envVariables,
    },
  },
  "POST /api/getRefs": {
    function: {
      handler: "packages/functions/src/testRail.getRefs",
      environment: envVariables,
    },
  },
  "POST /api/getList": {
    function: {
      handler: "packages/functions/src/testRail.getList",
      environment: envVariables,
    },
  },
  "POST /api/getID": {
    function: {
      handler: "packages/functions/src/testRail.getID",
      environment: envVariables,
    },
  },
  "POST /api/getSection": {
    function: {
      handler: "packages/functions/src/testRail.getSection",
      environment: envVariables,
    },
  },
};
