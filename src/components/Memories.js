import React, { Component } from 'react'
import Memory from './Memory'

class Memories extends Component {

  renderMemories = () => {

    return this.props.memories.map(memory => <Memory memory={memory} key={memory.id} deleteMemory={this.props.deleteMemory} updateMemory={this.props.updateMemory}/>)
  }


  render() {

    return <>{this.renderMemories()}</>;

  }



}


export default Memories