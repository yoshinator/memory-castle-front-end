
import React, { Component } from 'react'
import Memories from './Memories'
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/castles");

export default class Castle extends Component {

  state ={
    memories: [],
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

  componentDidMount() {
    ApiAdapter.getSingle(this.props.castle.id)
    .then(resp => this.setState({
      memories: resp.memories
    }))
  }
  addMemory = (event) => {

    
    
    let memory = document.createElement("div")
    memory.className = "memory"
    let node = document.createTextNode("This is new memory node.")
    memory.appendChild(node)
    let castleCard = document.getElementsByClassName("castle-card-expanded")
    memory.setAttribute("style", `left:${(event.clientX / event.target.width) * 100}%; top: ${(event.clientY / event.target.height) * 100}%;`);
    castleCard[0].appendChild(memory)

    console.log(event.target)
    console.log("Client X and Client Y", event.clientX, event.clientY) 
    console.log("Width Height", event.clientY, event.target.height);

  }


  render() {
    const styleNotExpanded = {
      background: `url(${this.props.castle.image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }

    if (this.state.expanded === false){
      return (
        <div className="castle-card" style={styleNotExpanded} >
          {this.jsxBuilder()}
        </div>
      )
    } else {
      return (
        <div className="castle-card-expanded" onClick={this.addMemory}  >
        <img src={this.props.castle.image} alt={this.props.castle.name}/>
          <Memories memories={this.state.memories} ApiAdapter={ApiAdapter} />
         {this.jsxBuilder()}
        </div>
      )
    }
  }
}
