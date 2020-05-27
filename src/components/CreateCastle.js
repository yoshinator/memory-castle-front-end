import React, { Component } from "react";
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/castles/");


class CreateCastle extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      user_id: this.props.user.id,
      image: ""
    }
  }

  createCastle = (event) => {
    event.preventDefault()
    ApiAdapter.createItem(this.state)
      .then(resp => {
        if (resp.ok) {
          //send castle to update user state at user level
        }else {
          console.error(resp)
        }
        return resp.json()
      }).then(newCastleData => {
        let newUser = this.props.user
         newUser.castles = this.props.user.castles.concat(newCastleData)
        this.props.updateCurrentUser(newUser)
        this.setState({
          name: "",
          image: ""
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signOut = () => {
    console.log("HIT")
    this.props.updateCurrentUser({})
    localStorage.clear()
  }
  render(){
    return <>
    <div className="create-castle-form">
    <button onClick={this.signOut}>Sign out</button>
        <form onSubmit={this.createCastle}>
          <input type="text" onChange={this.handleChange} placeholder="castle name" name="name" value={this.state.name} />
          <input type="text" onChange={this.handleChange} placeholder="Image url" name="image" value={this.state.image} />
          <button type="submit">Create Castle</button>
        </form>
      </div>
      </>

  }
}


export default CreateCastle;