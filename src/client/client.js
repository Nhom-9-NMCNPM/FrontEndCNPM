import {
    ApolloClient,
    InMemoryCache,
    split, HttpLink
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import {createUploadLink} from "apollo-upload-client";
import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
});

const uploadLink = createUploadLink({
  uri:'http://localhost:4000/graphql',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export default client;
  
  