import React from "react";
import { withAuthenticator } from "aws-amplify-react";
import { AmplifySignOut } from "@aws-amplify/ui-react";

import Todo from "./components/Todo";

import "./components/todo.scss";

import "@aws-amplify/ui/dist/style.css";

function App() {
  return (
    <div>
      <div className="signout-container">
        <AmplifySignOut />
      </div>
      <Todo />
    </div>
  );
}

export default withAuthenticator(App);
