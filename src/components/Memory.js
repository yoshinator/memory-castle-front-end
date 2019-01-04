
import React, { Component } from 'react'
class Memory extends Component {

  constructor(props){
    super(props);
    this.state ={
      id: this.props.memory.id,
      x: this.props.memory.x,
      y: this.props.memory.y,
      text: this.props.memory.text
    }
  }

  drag = (event, updateMemory) => {
      const newObj = {
        x: `${(event.clientX / window.innerWidth) * 100}%`,
        y: `${(event.clientY / window.innerHeight) * 100}%`
      }
      let {x, y} = newObj
      this.setState({x,y})
      updateMemory(newObj, this.state.id)
    }
  render() {
    return (
      <div draggable="true" onDragEnd={event => this.drag(event, this.props.updateMemory)} className="memory" id={`memory-${this.state.id}`} style={{ left: `${this.state.x}`, top: `${this.state.y}` }} >
        {" "}
        {this.state.text}
        <button className="delete-memory" onClick={() => this.props.deleteMemory(this.state.id)}>
          X
      </button>
      </div>
    )
  }
}


export default Memory; 


