import React, { Component } from 'react';
import JSONAPIAdapter from "./JSONAPIAdpater"
import Castles from "./components/Castles"
const ApiAdapter = new JSONAPIAdapter("api/v1/users/")


class App extends Component {
  
  state = {
        users: [],
        inputBox: "",
        currentUser: {}
  }
    
  componentDidMount(){
    ApiAdapter.getAll()
      .then(users => this.setState({ users }))
  }

  findUser = (event) => {
    console.log(event.target.value)
    if (event.target.value !== " ") {
      this.setState({ inputBox: event.target.value.toLowerCase() });
    }
  }

  setCurrentUser = (event) => {
    event.preventDefault()
    const found = this.state.users.filter(user => user.name === this.state.inputBox)
    
    if (found.length){
      this.setState({currentUser: found})
      console.log(this.state.currentUser)
    }
    else {
      this.createNewUser().then(currentUser =>
        this.setState({ currentUser })
      );
    }
  }

  createNewUser = () => {
    ApiAdapter.createItem({ name: this.state.inputBox })
      .then(resp => {
        if (resp.ok) {
          // Can be optimized later to just set state with out fetching from db again.
          ApiAdapter.getAll()
            .then(users => this.setState({ users }))
        }
        else {
          console.error(resp)  
        }
        return resp.json()
      })
  }

  render() {
    return <div className="App">
        <header className="App-header">
          <form onSubmit={this.setCurrentUser}>
            <input onChange={this.findUser} type="text" name="user" value={this.state.inputBox} />
            <button type="submit" name="submit">
              Sign in or Change User
            </button>
          </form>
        </header>
        <Castles user={this.state.currentUser[0]} /> 
      </div>;
  }
}

export default App;



