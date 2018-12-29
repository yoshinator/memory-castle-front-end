import React, { Component } from "react";
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/castles/");


class CreateCastle extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      user_id: this.props.userId,
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
      }).then(newCastleData => console.log(newCastleData))
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return (
      <div className="create-castle-form">
        <form onSubmit={this.createCastle}>
          <input type="text" onChange={this.handleChange} placeholder="castle name" name="name" value={this.state.name} />
          <input type="text" onChange={this.handleChange} placeholder="Image url" name="image" value={this.state.image} />
          <button type="submit">Create Castle</button>
        </form>
      </div>
    )

  }
}


export default CreateCastle;