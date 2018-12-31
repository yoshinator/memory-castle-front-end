
import React, { Component } from 'react'
import Memories from './Memories'
import CreateMemory from './CreateMemory'
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/castles");

export default class Castle extends Component {

  constructor(props){
    super(props);
    this.state ={
      memories: [],
      x: null, 
      y: null,
      expanded: false
    }

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

  updateCastle= (memories) => {
    this.setState({
      memories: memories
    })

  }

  componentDidMount() {
    ApiAdapter.getSingle(this.props.castle.id)
    .then(resp => this.setState({
      memories: resp.memories
    }))
  }
  addMemory = (event) => {
      console.log(event.target.width )
      if (isNaN(event.target.width) || event.target.width === 0){
        return 
      }else {
      this.setState({ 
        x: (event.clientX / event.target.width) * 100 ,
        y: (event.clientY / event.target.height) * 100
      });
    }
  }


  render() {
    console.log("castle props ", this.props)
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
          <CreateMemory x={this.state.x}  y={this.state.y} castle={this.props.castle} updateCastle={this.updateCastle}/>
          <Memories memories={this.state.memories} ApiAdapter={ApiAdapter} />
         {this.jsxBuilder()}
        </div>
      )
    }
  }
}
