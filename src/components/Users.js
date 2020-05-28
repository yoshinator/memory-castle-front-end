import React, { Component } from 'react';
import User from './User';
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/users");

 class Users extends Component {

  state = {
    name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      signUp: false,
      currentUser: {}
    }

  componentDidMount(){
    if (localStorage.getItem('jwt') && localStorage.getItem('id')){
      this.setCurrentUser(localStorage.getItem('id'))
    }
  }
  
  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  } 

   handleChange = (event) => {
     if (event.target.value !== " ") {
       this.setState({ [event.target.name]: event.target.value});
     }
   }

   setCurrentUser = (id) => {
      ApiAdapter.getSingle(id)
      .then(currentUser => {
        this.setState({currentUser})
      })
    }
  

   updateCurrentUser = (user) => {
      this.setState({
        currentUser: user
      })
   }

   createNewUser = () => {
    return ApiAdapter.createItem({ name: this.state.name, email: this.state.email, password: this.state.password })
       .then(resp => {
         if (resp.ok) {
           // Add user to something? 
         }
         else {
           console.error(resp)
         }
         return resp.json()
       })
      .then(response => {
        localStorage.setItem('jwt', response.jwt)
        localStorage.setItem('id', response.user.id)
        this.setCurrentUser(response.user.id)
      })
   }

   loginUser = (e) => {
    e.preventDefault()
     return ApiAdapter.createItem({user: { email: this.state.email,password: this.state.password }}, 'login')
       .then(resp => {
         if (resp.ok) {
           // Add user to something? 
         }
         else {
           console.error(resp)
         }
         return resp.json()
       })
       .then(response => {
          localStorage.setItem('jwt', response.jwt)
          localStorage.setItem('id', response.user.id)
          this.setCurrentUser(response.user.id)
       })
    }



  render() {
    if (this.isEmpty(this.state.currentUser)){
      return (
        <>
      <form className="sign-in-form signup" onSubmit={this.loginUser}>
          <input onChange={this.handleChange} type="email" name="email" value={this.state.email} placeholder="your@email.com"/>
            <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password"/>
          <button type="submit" name="submit" >
            Sign in
          </button>
        </form>
      <form className="sign-in-form" onSubmit={this.createNewUser}>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name} placeholder="your name"/>
          <input onChange={this.handleChange} type="email" name="email" value={this.state.email} placeholder="your@email.com" />
            <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password must be 6 characters"/>
          <button type="submit" name="submit">
            Sign up
          </button>
        </form>
        </>
      )
    }
    else {
      return (
        <>
        <User user={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} ApiAdapter={ApiAdapter}/>
        </>
      )
    }
  }

}



export default Users;