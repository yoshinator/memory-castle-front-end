
import React, { Component } from 'react'
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/castles");

export default class Castle extends Component {

  state ={
    expanded: false
  }

  handleExpand = () => {
    this.setState({expanded: !this.state.expanded})

  }

  handleDelete =() => {
    ApiAdapter.deleteItem(this.props.castle.id)
    .then(resp => this.props.updateCurrentUser(resp))
  }

  jsxBuilder = () => {
    return (
      <>
        <h2 className="castle-card-header">{this.props.castle.name} </h2>
        <button className="expand-castle" onClick={this.handleExpand}>
          Expand Castle
        </button>
        <button className="delete-castle" onClick={this.handleDelete}>
          Delete Castle
       </button>
       </>
    )
  }

  addMemory = () => {
    
  }



  render() {
    const style = {
      background: `url(${this.props.castle.image})`
    }

    if (this.state.expanded === false){
      return (
        <div className="castle-card" style={style} >
          {this.jsxBuilder()}
        </div>
      )
    } else {
      return (
        <div className="castle-card-expanded" onClick={this.addMemory} style={style} >
         {this.jsxBuilder()}
        </div>
      )
    }
  }
}
