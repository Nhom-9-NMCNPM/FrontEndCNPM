import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
const client = new ApolloClient({
  link: createUploadLink({
    uri: 'https://database-project1-demo.herokuapp.com/graphql',
  }), 
  cache: new InMemoryCache(),
});
export default client;
  
  