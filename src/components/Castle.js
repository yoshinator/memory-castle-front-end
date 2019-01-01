
import React, { Component } from 'react'
import Memories from './Memories'
import CreateMemory from './CreateMemory'
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/castles");
const MemoryAdapter = new JSONAPIAdapter("api/v1/memories");

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

  updateCastle= (memory) => {
    let memories = this.state.memories
    memories.push(memory)
    this.setState({
      memories
    })

  }

  componentDidMount() {
    ApiAdapter.getSingle(this.props.castle.id)
    .then(resp => this.setState({
      memories: resp.memories
    }))
  }
  addMemory = (event) => {
      if (isNaN(event.target.width) || event.target.width === 0){
        return 
      }else {
      this.setState({ 
        x: (event.clientX / event.target.width) * 100 ,
        y: (event.clientY / event.target.height) * 100
      });
    }
  }

  deleteMemory = (memoryId) => {
    //optimitically rendering. The response here returns a castle and can't get status code unless I change the ApiAdpater which migh break other things that rely on its deleteItem method. 
    let newMems = this.state.memories.filter(memory => memory.id !== memoryId)
    this.setState({
      memories: newMems
    })
    MemoryAdapter.deleteItem(memoryId)

  }

  updateMemory = (memoryId) => {
    console.log(memoryId)
    let div = document.getElementById(`memory-${memoryId}`)
    console.log(div)
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
          <Memories memories={this.state.memories} ApiAdapter={ApiAdapter} deleteMemory={this.deleteMemory} updateMemory={this.updateMemory}/>
         {this.jsxBuilder()}
        </div>
      )
    }
  }
}
