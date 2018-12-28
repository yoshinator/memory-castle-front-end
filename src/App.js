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
    return <div className="App">
        <header className="App-header">
          Welcome to Memory Castle
        </header>
        <Users users={this.state.users}  ApiAdapter={ApiAdapter}/>
      </div>;
  }
}

export default App;



