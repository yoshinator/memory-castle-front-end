import React, { Component } from "react";
import JSONAPIAdapter from "../JSONAPIAdpater";
const ApiAdapter = new JSONAPIAdapter("api/v1/memories/");

class CreateMemory extends Component {

  state ={
      text: "",
      castle_id: this.props.castle.id,
      x: "",
      y: ""
    }


  createMemory = (event) => {
    event.preventDefault()
    ApiAdapter.createItem(this.state)
      .then(resp => {
        if (resp.ok) {
          //confirm
        }
        else {
          console.error(resp)
        }
        return resp.json()
      }).then(newMemoryData => {
        let memories = this.props.castle.memories
        memories = this.props.castle.memories.concat(newMemoryData)
        this.props.updateCastle(memories)
        this.setState({
          x: "",
          y: ""
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  componentWillReceiveProps(nextProps) {
      this.setState({ 
        x: `${nextProps.x}%` ,
        y: `${nextProps.y}%`
      });

  }



    render(){
      if (this.state.x === "") {
        return <div/>
      }else {
      return (
        <div className="create-memory-form" style={{ left: `${this.state.x}`, top: `${this.state.y}` }}> 
          <form onSubmit={this.createMemory} >
            <input type="text" onChange={this.handleChange} placeholder="What do you want to rember?" name="text" value={this.state.text} autoFocus/>
            <button type="submit">Create Memory</button>
          </form>
        </div>
      )
      }
    }

}

export default CreateMemory;