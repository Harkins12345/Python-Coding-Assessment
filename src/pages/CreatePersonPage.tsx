import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { IPerson } from "../interfaces";
import config from "../services/config";

const CreatePersonPage: React.FC = () => {
  const history = useHistory();
  const [person, setPerson] = useState<IPerson>();

  const checkedChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = ev.target;
    const newPerson: IPerson = { ...person };

    switch (id) {
      case "firstName":
        newPerson.firstName = ev.target.value;
      case "lastName":
        newPerson.lastName = ev.target.value;
      case "authorised":
        newPerson.authorised = checked;
        break;
      case "enabled":
        newPerson.enabled = checked;
        break;
      default:
        break;
    }

    setPerson(newPerson);
  };

  const saveChanges = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    ev.stopPropagation();

    const response = await fetch(`${config.baseUrl}/people`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });

    if (response.ok) {
      history.push("/people");
    }
  };

  return (
    <React.Fragment>
      <h1 className="title">Create New Person</h1>

      <form onSubmit={saveChanges}>
        <fieldset className="box is-shadowless pl-0 pr-0">
          <legend className="has-text-weight-semibold">User Details</legend>

          <div className="field">
            <div className="control mr-5">
              <label
                htmlFor="firstName"
                className="checkbox has-text-grey pr-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                className="switch is-rounded is-outlined is-danger"
                type="text"
                name="firstName"
                onChange={checkedChanged}
              />
            </div>
            <br />

            <div className="control mr-5">
              <label htmlFor="lastName" className="checkbox has-text-grey pr-2">
                Last Name
              </label>
              <input
                id="lastName"
                className="switch is-rounded is-outlined is-danger"
                type="text"
                name="lastName"
                onChange={checkedChanged}
              />
            </div>

            <div className="control mr-5 mt-3">
              <input
                id="authorised"
                className="switch is-rounded is-outlined is-danger"
                type="checkbox"
                name="authorised"
                onChange={checkedChanged}
              />
              <label htmlFor="authorised" className="checkbox has-text-grey">
                Authorised
              </label>
            </div>

            <div className="control mr-5 mt-3">
              <input
                id="enabled"
                className="switch is-rounded is-outlined is-danger"
                type="checkbox"
                name="enabled"
                onChange={checkedChanged}
              />
              <label htmlFor="enabled" className="checkbox has-text-grey">
                Enabled
              </label>
            </div>
          </div>
        </fieldset>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              className="button is-light"
              onClick={() => history.push("/people")}
            >
              Cancel
            </button>
          </div>
          <div className="control">
            <input
              className="button is-warning"
              type="submit"
              value="Save Person"
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreatePersonPage;
