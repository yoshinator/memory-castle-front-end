
import React, { Component } from 'react'

export default class EditCastle extends Component {

  state ={
    name: this.props.name,
    image: this.props.image
  }

  updateCastle = (event) => {
    event.preventDefault()
    
    this.props.ApiAdapter.updateItem(this.state, this.props.castleId)
      .then(this.props.handleEdit(event, this.state.name, this.state.image))

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value    
    })
  } 


  render() {
    return <div className="edit-castle-form">
        <form onSubmit={event => this.updateCastle(event)}>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name} />
          <input onChange={this.handleChange} type="text" name="image" value={this.state.image} />
          <br />
          <button>Update</button>
        </form>
      </div>;
  }
}
