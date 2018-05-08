import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

// import ApolloClient class and give it a configuration Object
import ApolloClient from 'apollo-boost'

// import ApolloProvider Component to wrap your application
import { ApolloProvider } from 'react-apollo'

// import gql from "graphql-tag";
import './index.css'

const client = new ApolloClient({
  uri: "http://localhost:3050/graphql"
})

ReactDOM.render( 
  <ApolloProvider client={ client }>
    <App />
  </ApolloProvider>, document.getElementById('root')
)