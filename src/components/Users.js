import React, { Component } from 'react';
import User from './User';
import GoogleAuth from './GoogleAuth'

 class Users extends Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      inputBox: "",
      currentUser: {}
    }
  }

   isEmpty = (obj) => {
     for (var key in obj) {
       if (obj.hasOwnProperty(key))
         return false;
     }
     return true;
   } 

   findUser = (event) => {
     if (event.target.value !== " ") {
       this.setState({ inputBox: event.target.value.toLowerCase() });
     }
   }

   setCurrentUser = (event) => {
      event.preventDefault()
       this.createNewUser().then(currentUser =>
         this.setState({ currentUser }, () => console.log(this.state.currentUser))
       );
    }
  

   updateCurrentUser = (user) => {
      this.setState({
        currentUser: user
      })
   }

   createNewUser = () => {
    return this.props.ApiAdapter.createItem({ name: this.state.inputBox })
       .then(resp => {
         if (resp.ok) {
           // Add user to something? 
         }
         else {
           console.error(resp)
         }
         return resp.json()
       })
   }


  render() {
    if (this.isEmpty(this.state.currentUser)){
      return (
        <>
      <form className="sign-in-form" onSubmit={this.setCurrentUser}>
          <input onChange={this.findUser} type="text" name="user" value={this.state.inputBox} />
          <button type="submit" name="submit">
            Sign in or Change User
          </button>
        </form>
        <GoogleAuth />
        </>
      )
    }
    else {
      return (
        <>
        <form className="sign-in-form" onSubmit={this.setCurrentUser}>
          <input onChange={this.findUser} type="text" name="user" value={this.state.inputBox} />
          <button type="submit" name="submit">
            Sign in or Change User
          </button>
        </form>
        <User user={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} ApiAdapter={this.props.ApiAdapter}/>
        </>
      )
    }
  }

}



export default Users;