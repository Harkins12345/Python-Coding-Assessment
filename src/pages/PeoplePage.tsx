import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonRow from "../components/PersonRow";
import { IPerson } from "../interfaces";
import config from "../services/config";

const fetchPeople = async (): Promise<IPerson[]> => {
  const response = await fetch(`${config.baseUrl}/people`, { method: "GET" });

  if (!response.ok) {
    return [];
  }

  return await response.json();
};

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<IPerson[]>([]);

  useEffect(() => {
    fetchPeople().then((res) => setPeople(res));
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1 className="title">People</h1>

        <Link className="button is-success" to={`/create-person`}>
          Create Person
        </Link>
      </div>

      <div className="tile is-ancestor people-list">
        <div className="tile is-vertical">
          <div className="tile is-parent pb-0 is-hidden-mobile">
            <article className="tile is-child notification has-background-white columns pt-0 pb-0">
              <div className="column has-text-weight-semibold">Name</div>
              <div className="column has-text-weight-semibold">Authorised</div>
              <div className="column has-text-weight-semibold">Enabled</div>
            </article>
          </div>
          {people.map((p, i) => (
            <PersonRow person={p} key={i} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PeoplePage;
