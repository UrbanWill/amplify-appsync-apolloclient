import React from "react";
import ReactDOM from "react-dom";
import { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloLink } from "apollo-link";
import { createAuthLink } from "aws-appsync-auth-link";
import { createHttpLink } from "apollo-link-http";
import Amplify, { Auth } from "aws-amplify";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AppSyncConfig from "./aws-exports";

Amplify.configure(AppSyncConfig);

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_appsync_region;

const auth = {
  type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
  jwtToken: async () =>
    (await Auth.currentSession()).getIdToken().getJwtToken(),
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createHttpLink({ uri: url }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
