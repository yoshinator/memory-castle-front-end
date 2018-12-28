import React, { Component } from "react";

class CreateCastle extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "house",
      user_id: 1,
      image: "../memory-castle-front-end/public/images/1.jpg",
      memories: []
    }
  }

  createCastle = (event) => {
    event.preventDefault()
    console.log(this.state)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    return <div>
        create castle component
        <form onSubmit={this.createCastle}>
          <input type="text" onChange={this.handleChange} placeholder="castle name" name="name" value={this.state.name} />
          <input type="text" onChange={this.handleChange} placeholder="Image url" name="image" value={this.state.image} />
          <button type="submit">Create Castle</button>
        </form>
      </div>;

  }
}


export default CreateCastle;