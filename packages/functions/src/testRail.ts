import { FetchedCases, FetchedSections, JsonProj, Project } from "models/types";
import { envVariables } from "./variables";

export async function getProj() {
  let proj: Project[] = [];
  try {
    const response = await fetch(
      "https://trajector.testrail.io//index.php?/api/v2/get_projects",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              `${envVariables.TESTRAIL_USERNAME}:${envVariables.TESTRAIL_PASSWORD}`
            ),
        },
      }
    );

    const json = (await response.json()) as JsonProj;

    if (response.ok) {
      console.log("Fetch Success");
      //console.log("PROJ DATA: ", json.projects);
      proj = json.projects.map(({ id, name }) => ({ id, name }));

      return {
        statusCode: 200,
        body: JSON.stringify(proj),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (!response.ok) {
      console.log("Fetch Error 1", response.status);
      return {
        statusCode: response.status,
        body: JSON.stringify(json),
      };
    }
  } catch (error) {
    console.log("Fetch Error 2");
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}

export async function editCustomFields(event: {
  body: string;
  headers: { [key: string]: string };
}) {
  const parsedBody = JSON.parse(event.body);
  const projectId2 = parsedBody.projectId2;
  const suiteId2 = parsedBody.suiteId2;
  const sectionId2 = parsedBody.sectionId2;
  const id2 = parsedBody.id2;
  const associated_test_cases = parsedBody.associated_test_cases;

  try {
    const response = await fetch(
      `https://trajector1.aha.io/api/v1/features/${id2}`,
      {
        method: "PUT",
        body: JSON.stringify({
          feature: {
            custom_fields: {
              section_id2: sectionId2,
              projectid: projectId2,
              suiteid: suiteId2,
              associated_test_cases: associated_test_cases,
            },
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: envVariables.AUTHORIZATION,
        },
      }
    );

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify("Custom fields updated successfully"),
      };
    } else {
      throw new Error(`Error updating custom fields for ${id2}`);
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}

export async function updateCase(event: {
  body: string;
  headers: { [key: string]: string };
}) {
  const { refs, id } = JSON.parse(event.body);

  try {
    const res = await fetch(
      `https://trajector.testrail.io/index.php?/api/v2/update_case/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          refs: refs,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              `${envVariables.TESTRAIL_USERNAME}:${envVariables.TESTRAIL_PASSWORD}`
            ),
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: {
          error: JSON.stringify(json),
        },
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}

export async function getRefs(event: {
  body: string;
  headers: { [key: string]: string };
}) {
  const { id } = JSON.parse(event.body);

  try {
    const res = await fetch(
      `https://trajector.testrail.com/index.php?/api/v2/get_case/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(
              `${envVariables.TESTRAIL_USERNAME}:${envVariables.TESTRAIL_PASSWORD}`
            ).toString("base64"),
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json",
        }
      };
    }

    if (!res.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: json }),
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Something went wrong: ${error}` }),
    };
  }
}

export async function getList(event: {
  body: string;
  headers: { [key: string]: string };
}) {
  const { projectId, suiteId, sectionId } = await JSON.parse(event.body);

  try {
    const res = await fetch(
      `https://trajector.testrail.com/index.php?/api/v2/get_cases/${projectId}&suite_id=${suiteId}&section_id=${sectionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic" +
            btoa(
              `${envVariables.TESTRAIL_USERNAME}:${envVariables.TESTRAIL_PASSWORD}`
            ),
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(json),
      };
    }

    if (!res.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json",
        }
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Something went wrong: ${error}` }),
    };
  }
}

export async function getID(event: {
  body: string;
  headers: { [key: string]: string };
}) {
  const { project_id } = JSON.parse(event.body);
  const TESTRAIL_USERNAME = process.env.TESTRAIL_USERNAME;
  const TESTRAIL_PASSWORD = process.env.TESTRAIL_PASSWORD;

  const df: { suite_id: string; section_id: string }[] = [];
  let datas: { id: string; name: string; suite_id: string }[];

  try {
    const response = await fetch(
      `https://trajector.testrail.com/index.php?/api/v2/get_cases/${project_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(`${TESTRAIL_USERNAME}:${TESTRAIL_PASSWORD}`).toString(
              "base64"
            ),
        },
      }
    );

    const json: FetchedCases = (await response.json()) as FetchedCases;

    if (json.cases) {
      if (json.cases.length === 0) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            error: "No Test Cases!",
          }),
        };
      }
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          error: "No Test Cases!",
        }),
      };
    }

    df.push(
      ...json.cases.map(({ suite_id, section_id }) => ({
        suite_id,
        section_id,
      }))
    );

  } catch (error) {
    console.log("ERROR 1", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error1: error,
      }),
    };
  }

  let result_dict: { [suite_id: string]: string[] } = {};
  for (const { suite_id, section_id } of df) {
    if (!result_dict[suite_id]) {
      result_dict[suite_id] = [];
    }
    result_dict[suite_id].push(section_id);
  }

  try {
    const url = `https://trajector.testrail.com/index.php?/api/v2/get_sections/${project_id}&suite_id=${
      Object.keys(result_dict)[0]
    }`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${TESTRAIL_USERNAME}:${TESTRAIL_PASSWORD}`).toString(
            "base64"
          ),
      },
    });

    const json: FetchedSections = (await response.json()) as FetchedSections;

    datas = json.sections.map(({ id, name, suite_id }) => ({
      id,
      name,
      suite_id,
    }));
  } catch (error) {
    console.log("ERROR 2", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error2: error,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(datas),
    headers:{
      "Content-Type": "application/json"
    }
  };
}

export async function getSection(event: {
  body: string;
  headers: { [key: string]: string };
}) {
  const { section_Id } = JSON.parse(event.body);
  try {
    const res = await fetch(
      `https://trajector.testrail.com/index.php?/api/v2/get_section/${section_Id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(`${envVariables.TESTRAIL_USERNAME}:${envVariables.TESTRAIL_PASSWORD}`)
        }
      }
    );

    const json = await res.json();

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(json),
        headers: {
          "Content-Type": "application/json"
        }
      };
    }

    if (!res.ok) {
      console.log("/getSection Error", json);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: json })
      };
    }

  } catch (error) {
    console.log("/getSection Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    };
  }
};