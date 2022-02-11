import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IPerson } from "../interfaces";
import config from "../services/config";

const fetchPerson = async (id: string): Promise<IPerson | undefined> => {
  const response = await fetch(`${config.baseUrl}/person/${id}`, {
    method: "GET",
  });

  return response.ok ? await response.json() : undefined;
};

const PersonPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<IPerson>();
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    fetchPerson(id).then((res) => {
      if (!res) {
        return;
      }

      setPerson(res);
      setFullName(`${res.firstName} ${res.lastName}`);
    });
  }, []);

  const checkedChanged = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!person) {
      return;
    }

    const { id, checked } = ev.target;
    const newPerson = { ...person };

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

    const updatedResponse = await fetch(`${config.baseUrl}/person/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    if (updatedResponse.ok) {
      history.push("/people");
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`${config.baseUrl}/person/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      history.push("/people");
    }
  };

  return (
    <React.Fragment>
      <h1 className="title">Update {fullName}</h1>

      <form onSubmit={saveChanges}>
        <fieldset className="box is-shadowless pl-0 pr-0">
          <legend className="has-text-weight-semibold">User Details</legend>

          {person && (
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
                  defaultValue={person.firstName}
                  onChange={checkedChanged}
                />
              </div>
              <br />

              <div className="control mr-5">
                <label
                  htmlFor="lastName"
                  className="checkbox has-text-grey pr-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="switch is-rounded is-outlined is-danger"
                  type="text"
                  name="lastName"
                  defaultValue={person.lastName}
                  onChange={checkedChanged}
                />
              </div>

              <div className="control mr-5 mt-3">
                <input
                  id="authorised"
                  className="switch is-rounded is-outlined is-danger"
                  type="checkbox"
                  name="authorised"
                  defaultChecked={person.authorised}
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
                  defaultChecked={person.enabled}
                  onChange={checkedChanged}
                />
                <label htmlFor="enabled" className="checkbox has-text-grey">
                  Enabled
                </label>
              </div>
            </div>
          )}
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
              disabled={!person}
              className="button is-warning"
              type="submit"
              value="Update Person"
            />
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-danger"
              onClick={handleDelete}
            >
              Delete Person
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default PersonPage;
