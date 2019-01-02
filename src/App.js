import React, { Component } from 'react';
import JSONAPIAdapter from "./JSONAPIAdpater"
import Users from "./components/Users"
const ApiAdapter = new JSONAPIAdapter("api/v1/users/")


class App extends Component {
  
  state = {
        users: []
  }
    
  componentDidMount(){
    ApiAdapter.getAll()
      .then(users => this.setState({ users }))
  }

  render() {
    return (
    <div className="App">
        <header className="App-header">
          Welcome to Memory Castle
        </header>
        <div className="intro">
          A Memory Palace, is an imaginary location in
        your mind where you can store mnemonic images. The most common
        type of memory palace involves making a journey through a place
        you know well, like a building or town. Along that journey there
        are specific locations that you always visit in the same order.
          <a href="https://sansforgetica.rmit/" >On your journey you will see this crazy font. Its a font developed by MIT, it's scientifically designed to help you remember things. </a>
        </div>
        <Users users={this.state.users}  ApiAdapter={ApiAdapter}/>
      </div>
    )
  }
}

export default App;



