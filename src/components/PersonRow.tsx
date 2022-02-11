import React from "react";
import { Link } from "react-router-dom";
import { IPerson } from "../interfaces";

interface IPersonRowProps {
  person: IPerson;
}

const PersonRow: React.FC<IPersonRowProps> = ({ person }) => {
  const fullName = `${person.firstName} ${person.lastName}`;

  return (
    <React.Fragment>
      <div className="tile is-parent">
        <article className="tile is-child notification columns">
          <div className="column">
            <h2 className="is-hidden-tablet">Name</h2>
            <Link
              className="has-text-weight-semibold"
              to={`/person/${person.id}`}
            >
              {fullName}
            </Link>
          </div>
          <div
            className="column"
            style={person.authorised ? { color: "green" } : { color: "red" }}
          >
            <h2 className="is-hidden-tablet">Authorised</h2>
            {person.authorised ? "Yes" : "No"}
          </div>
          <div
            className="column"
            style={person.enabled ? { color: "green" } : { color: "red" }}
          >
            <h2 className="is-hidden-tablet" style={{ color: "green" }}>
              Enabled
            </h2>
            {person.enabled ? "Yes" : "No"}
          </div>
        </article>
      </div>
    </React.Fragment>
  );
};

export default PersonRow;
