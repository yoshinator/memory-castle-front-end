
import React, { Component } from 'react'
import Memories from './Memories'
import CreateMemory from './CreateMemory'
import EditCastle from './EditCastle'
import JSONAPIAdapter from "../JSONAPIAdpater"
const ApiAdapter = new JSONAPIAdapter("api/v1/castles");
const MemoryAdapter = new JSONAPIAdapter("api/v1/memories");

export default class Castle extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      name: this.props.castle.name,
      image: this.props.castle.castle_image,
      memories: [],
      x: null, 
      y: null,
      expanded: false,
      editing: false,
      newMem: false
    }
    
  }
  
  componentDidMount() {
    ApiAdapter.getSingle(this.props.castle.id)
    .then(resp => this.setState({
      memories: resp.memories
    }))
  }
  handleExpand = () => {
    this.setState({expanded: !this.state.expanded})

  }

  handleDelete =() => {
    ApiAdapter.deleteItem(this.props.castle.id)
    .then(resp => this.props.updateCurrentUser(resp))
  }

  handleEdit = (event, name=this.state.name, image=this.state.image) =>{
    this.setState({ 
      name: name,
      image: image,
      editing: !this.state.editing 
    })
  }
  
  updateCastle= (memory) => {
    let memories = this.state.memories
    memories.push(memory)
    this.setState({
      memories
    })
  }
  
  addMemory = (event) => {    
    if (isNaN(event.target.width) || event.target.width === 0){
      return 
    }
    else {
      this.setState({ 
        newMem: true,
        x: (event.clientX / event.target.width) * 100 ,
        y: (event.clientY / event.target.height) * 100
      });
    }
  }

  updateMemory = (memoryPositionObject, id) => {
    MemoryAdapter.updateItem(memoryPositionObject, id)
      .then(resp => resp.json())
      .then(mem => {
        const filtered = this.state.memories.filter(memory => {
          return memory.id !== mem.id
        })
        this.setState({memories: [...filtered, mem], newMem: false})
      })

  }
  
  deleteMemory = (memoryId) => {
    //optimitically rendering. The response here returns a castle and can't get status code unless I change the ApiAdpater which migh break other things that rely on its deleteItem method. 
    let newMems = this.state.memories.filter(memory => memory.id !== memoryId)
    this.setState({
      memories: newMems
    })
    MemoryAdapter.deleteItem(memoryId)
  }
  
  jsxBuilder = () => {
    return (
      <>
        <h2 className="castle-card-header">{this.state.name} </h2>
        <button className="expand-castle" onClick={this.handleExpand}>
          Min
        </button>
        <button className="edit-castle" onClick={this.handleEdit}> Edit</button>
        {!this.state.expanded && <label className="delete-castle" onClick={this.handleDelete}>
          <i className="far fa-times-circle"></i>
       </label>}
       </>
    )
  }
  
  render() {
    if (this.state.expanded === false && this.state.editing === false){
      const styleNotExpanded = {
        background: `url(${this.state.image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        zIndex: '1',
      }
      return (
        <div className="castle-card" style={styleNotExpanded} >
          {this.jsxBuilder()}
        </div>
      )

    } 
    else if (this.state.expanded === true && this.state.editing === false){
      return (
        <div className="castle-card-expanded" onClick={this.addMemory} >
        <img src={this.state.image} alt={this.state.name}/>
          
          {this.state.newMem && <CreateMemory x={this.state.x} y={this.state.y} castle={this.props.castle} updateCastle={this.updateCastle} />}

           <Memories memories={this.state.memories} ApiAdapter={ApiAdapter} deleteMemory={this.deleteMemory} updateMemory={this.updateMemory}/>

         {this.jsxBuilder()}
        </div>
      )
    } 
    else {
      return (
        <div className="castle-card-expanded editing" onClick={this.addMemory} >
          <img src={this.state.image} alt={this.state.name} />
          <EditCastle handleEdit={this.handleEdit} ApiAdapter={ApiAdapter} name={this.state.name} image={this.state.image} castleId={this.props.castle.id}/>
          {this.jsxBuilder()}
        </div>
      )
    }
  }
}
