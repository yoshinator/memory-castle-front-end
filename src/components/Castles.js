import React, { Component } from 'react'
import Castle from './Castle'

class Castles extends Component {
  state ={
    refresh: false
  }

  refresh =()=>{
    this.setState({
      refresh: !this.state.refresh
    })
  }

  renderCastles = () => {
    return this.props.castles.map(castle => <Castle refresh={this.refresh} castle={castle} key={castle.id} updateCurrentUser={this.props.updateCurrentUser} user={this.props.user} />)
  }



  render() {
  
    return <div className="castles-container" >{this.renderCastles()}</div>;

    }



}


export default Castles