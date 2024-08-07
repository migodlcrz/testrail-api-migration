# **SST TESTRAIL API Documentation**

# **getProj**
This request gets the lists of projects on the testrail website.
* **METHOD**
    `GET`

* **URL**
    **Required**
    `/api/getProj`
* **Success Response**

    * **Code** `200`

    * **Content** 
    ```json
        [
            {"id": 1, "name": "Example Name"},
            {"id": 2, "name": "Example Name 2"}
        ]
    ```

* **Sample Call** 
    ```javascript
        const response = await fetch(`${baseURL}/api/getProj`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Basic " + btoa(`${TESTRAIL_USERNAME}:${TESTRAIL_PASSWORD}`),
                },
            }
        )
    ```

# **getRefs**
    Gets the case from testrail using the id request body.
* **METHOD**
    `POST`

* **URL**
    **Required**
    `/api/getRefs`

* **Request Body**
    ```json
        {
            "id": Number
        }
    ````

* **Success Response**

    * **Code** `200`

    * **Content** 
    ```json
    {
        "id":,
        "title":,
        "section_id":,
        "template_id":,
        "type_id":,
        "priority_id":,
        "milestone_id":,
        "refs":,
        "created_by":,
        "created_on" :,
        "updated_by" :,
        "updated_on" :,
        "estimate":,
        "estimate_forecast":,
        "suite_id":,
        "display_order":,
        "is_deleted":,
        "custom_automation_type":,
        "custom_ready_for_automation":,
        "custom_preconds":,
        "custom_steps":,
        "custom_testrail_bdd_scenario":,
        "custom_expected":,
        "custom_steps_separated": [
            {
                "content":,
                "expected":,
                "additional_info":,
                "refs":,
            },
        ],
        "custom_mission":,
        "custom_goals":,
    }
    ```

* **Sample Call** 
    ```javascript
        const response = await fetch(`${baseURL}/api/getProj`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Basic " + btoa(`${TESTRAIL_USERNAME}:
                    ${TESTRAIL_PASSWORD}`),
                },
            }
        )
    ```

# **getSection**
Gets the section details from TestRail
* **METHOD**
    `POST`

* **URL**
    **Required**
    `/api/getSection`

* **Request Body Example** 
    ```json
    {
        "section_Id": 0000
    }
* **Success Response**

    * **Code** `200`

    * **Content** 
    ```json
        [
            {"id": 1, "name": "Example Name"},
            {"id": 2, "name": "Example Name 2"}
        ]
    ```

* **Sample Call** 
    ```javascript
        const response = await fetch(`${baseURL}/api/getProj`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Basic " + btoa(`${TESTRAIL_USERNAME}:
                    ${TESTRAIL_PASSWORD}`),
                },
            }
        )
    ```

# **getList**
Gets all test cases within a section in TestRail
* **METHOD**
    `POST`

* **URL**
    **Required**
    `/api/getList`
* **Request Body Example** 
    ```json
    {
        "projectId": Number,
        "suiteId": Number,
        "sectionId": Number,
        "associatedtestcases": "[]"
    }
* **Success Response**

    * **Code** `200`

    * **Content** 
    ```json
        //Todo
    ```

* **Sample Call** 
    ```javascript
        const response = await fetch(`${url}/api/getList`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(`${TESTRAIL_USERNAME}:${TESTRAIL_PASSWORD}`)
          },
          body: JSON.stringify({
            projectId,
            suiteId,
            sectionId,
          }),
        });
    ```

# **getID**
Retrieves all the sections from a project in TestRail
* **METHOD**
    `POST`

* **URL**
    **Required**
    `/api/getList`
* **Request Body Example** 
    ```json
    {
        "project_id": Number,
    }
* **Success Response**

    * **Code** `200`

    * **Content** 
    ```json
        [
            {
                "id": Number,
                "name": "String",
                "suite_id": Number
            }
        ],
    ```

* **Sample Call** 
    ```javascript
        const response = await fetch(`${url}/api/getList`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
          }),
        });
    ```

# **updateCase**
Updates the TestRail Test Case by It's ID. Reference Field will be populated by what is contained in the Refs field
refs: string that will hold the AHA! Feature Id's seperated by commas that will populate the reference field in TestRail 
* **METHOD**
    `POST`

* **URL**
    **Required**
    `/api/updateCase`

* **Request Body Example** 
    ```json
    {
        "id": "string",
        "refs": "string"
    }
    ```

* **Success Response**

    * **Code** `200`

    * **Content** 
    ```json
        {"message": "Case updated Successfully"}
    ```

* **Sample Call** 
    ```javascript
        const response = await fetch(`${link.TESTRAIL_UPDATE_CASE}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ refs: updatedRefs, id: `${id}` }),
        });
    ```

# **editCustomFields**
Edits the custom field in AHA according to the given feature ID
* **METHOD**
    `POST`

* **URL**
    **Required**
    `/api/updateCase`

* **Request Body Example** 
    ```json
        {
            "id2": "string",
            "associated_test_cases": "[]"
        }
    ```

    Note: associated_test_cases requires an array of objects that has been stringified using JSON.stringify() due to how AHA handles custom fields.

* **Success Response**

    * **Code** `200`

    * **Content** 
    ```json
        {"message": "Custom fields updated successfully"}
    ```

* **Sample Call** 
    ```javascript
      const request1 = fetch(`${url}/api/editCustomFields`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${link.AHA_GET_FEATURE_APIKEY}`,
        },
        body: JSON.stringify({ id2, associated_test_cases }),
      });
    ```

    *Note: There is an inconsistency within the naming scheme of the Id's being id and id2. Those fields use the same required id from an AHA Feature.*







