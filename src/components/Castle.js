
import React, { Component } from 'react'
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/castles");

export default class Castle extends Component {

  handleExpand = () => {

  }

  handleDelete =() => {
    ApiAdapter.deleteItem(this.props.castle.id)
    .then(resp => this.props.updateCurrentUser(resp))
  }

  render() {
    return (
      <div className="castle-card">
        <h2 className="castle-card-header">{this.props.castle.name}</h2>
        <img src={this.props.castle.image} alt={this.props.castle.name} />
        <button className="expand-castle" onClick={this.handleExpand}>
          Expand Castle
        </button>
        <button className="delete-castle" onClick={this.handleDelete}>
          Delete Castle
        </button>
      </div>
    )
  }
}
