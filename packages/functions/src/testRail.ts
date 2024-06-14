import { JsonProj, Project } from "models/types";
import { envVariables } from "./variables";

export async function main() {
  return {
    statusCode: 200,
    body: JSON.stringify("Hello World!"),
  };
}

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
            btoa(`${envVariables.TESTRAIL_USERNAME}:${envVariables.TESTRAIL_PASSWORD}`),
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
          "Content-Type": "application/json"
        }
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
    console.log(error)
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
    // return c.json({ "Error ": error }, 500);
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
            btoa(`${envVariables.TESTRAIL_USERNAME}:${envVariables.TESTRAIL_PASSWORD}`),
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(json),
        headers :{
          "Content-Type": "application/json"
        }
      };
    }

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: {
          "error": JSON.stringify(json),
        }
      };
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}

export async function getCase() {
  
}

export async function getRefs() {

}

export async function getList() {

}

export async function getID() {

}