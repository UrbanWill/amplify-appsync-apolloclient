import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import gql from "graphql-tag";
import { listUsers } from "./graphql/queries";
import logo from "./logo.svg";
import "./App.css";

import { useQuery } from "@apollo/react-hooks";

function App() {
  const { data, loading, error } = useQuery(gql(listUsers));

  if (loading) {
    console.log("loading");
    console.log(loading);
  }

  if (error) {
    console.log("error");
    console.log(error);
    return null;
  }

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
