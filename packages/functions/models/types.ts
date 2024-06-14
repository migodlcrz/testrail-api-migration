// import { KVNamespace, D1Database } from "@cloudflare/workers-types";
//  FROM ENV TYPES /models/envtypes.ts
// export type Env = {
//   OPENAI_API_KEY: string;
//   TESTRAIL_USERNAME: string;
//   TESTRAIL_PASSWORD: string;
//   AUTHORIZATION: string;
//   PUBLIC_KEY: string;
//   MOCK: boolean;
//   TESTRAIL_PUSH: boolean;
//   BASE_URL: string;
//   MY_KV_NAMESPACE: string;
//   TRAJECTOR_OPENAI_KEY1: string;
//   TRAJECTOR_OPENAI_KEY2: string;
//   TRAJECTOR_OPENAI_ENDPOINT: string;
//   KV1: KVNamespace;
// };

// export type D1Env = {
//   DB: D1Database;
//   database_id: string;
//   database_name: string;
// };

export type AccountTable = {
  results: Accounts[];
};

export type Accounts = {
  email: string;
  aha_api_key: string;
  testrail_username: string;
  testrail_api_key: string;
};

//   RETURN TEMPLATES /models/returnTemplates.ts
export interface Project {
  id: number;
  name: string;
}

export interface Product {
  reference_prefix: string;
  name: string;
}

export interface JsonProj {
  projects: Project[];
}

export interface JsonProd {
  products: Product[];
  pagination: any;
}

export interface JsonFeatList {
  features: FeatItem[];
  pagination: any;
}

export interface JsonFeatReq {
  requirements: FeatDescripJson[];
  pagination: any;
}

export interface JsonFeatReqSolo {
  feature: FeatDescripJson;
}

export interface FeatItem {
  reference_num: string;
  name: string;
}

export interface FeatDescripJson {
  id: string;
  reference_num: string;
  name: string;
  description: {
    body: string;
  };
}

export interface FeatDescrip {
  id: string;
  reference_num: string;
  name: string;
  description_body: string;
}

interface customStepProp {
  content: string;
  expected: string;
}

export interface testCaseProp {
  title: string;
  custom_preconds: string;
  custom_steps_separated: customStepProp[];
}

export interface testCases {
  name: string;
  GeneratedTestCase: testCaseProp[];
}

export interface FetchedIds {
  cases: { suite_id: string; section_id: string }[];
}

export interface FetchedCases {
  cases: { suite_id: string; section_id: string }[];
}

export interface FetchedSections {
  sections: {
    id: string;
    name: string;
    suite_id: string;
  }[];
}

export interface GeneratedTC {
  name: string;
  GeneratedTestCase: testCaseProp[];
}

export interface TestRail {
  GTC: GeneratedTC[];
  project_id: string;
}

export interface SectionData {
  id: number;
}

export interface CaseData {
  id: number;
}

export interface Link {
  title: string;
  link: string;
}

export interface LinkObject {
  name: string;
  Test_Rail: Link[];
}

export interface AhaRoot {
  user: AhaUser;
}

export interface AhaUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  accessed_at: string;
  product_roles: ProductRole[];
  preferences: {
    current_product_id: number;
  };
  accounts: AhaAccount[];
}

export interface ProductRole {
  role: number;
  role_description: string;
  product_id: string;
  product_name: string;
}

export interface AhaAccount {
  account: {
    name: string;
    domain: string;
    logo: any;
    alt_logo: any;
    enabled: boolean;
  };
}

export interface TestRailRoot {
  id: number;
  email: string;
  email_notifications: boolean;
  is_active: boolean;
  is_admin: boolean;
  name: string;
  role_id: number;
  role: string;
  group_ids: number[];
  mfa_required: boolean;
}
