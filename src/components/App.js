import React, { Component } from 'react'
import List from './List'
import Header from './header/Header'
import Tech from './header/Tech'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header>
          <Tech 
            tech='GraphQL' 
            image='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2000px-GraphQL_Logo.svg.png' 
          />
          <Tech 
            tech='Apollo'
            image='https://seeklogo.com/images/A/apollo-logo-DC7DD3C444-seeklogo.com.png'  
          />
          <Tech 
            tech='React'
            image='https://www.qualium-systems.com/wp-content/uploads/2015/07/icon-reactjs.svg'
          />
        </Header>
        {/* Display list of fetched data */}
      </div>
    )
  }
}