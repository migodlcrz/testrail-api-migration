export const envVariables: {
    TESTRAIL_USERNAME: string;
    TESTRAIL_PASSWORD: string;
    AUTHORIZATION: string;
} = {
    TESTRAIL_USERNAME: process.env.TESTRAIL_USERNAME || "",
    TESTRAIL_PASSWORD: process.env.TESTRAIL_PASSWORD || "",
    AUTHORIZATION: process.env.AUTHORIZATION || "",
  };
  