import React from "react";
import { withAuthenticator } from "aws-amplify-react";

import Todo from "./components/Todo";

import "@aws-amplify/ui/dist/style.css";

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default withAuthenticator(App);
