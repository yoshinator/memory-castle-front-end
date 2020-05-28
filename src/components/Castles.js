import React, { Component } from 'react'
import Castle from './Castle'

class Castles extends Component {

  renderCastles = () => {
    return this.props.castles.map(castle => {
      return <Castle castle={castle} key={castle.id+Math.random()} updateCurrentUser={this.props.updateCurrentUser} user={this.props.user} />
    })
  }



  render() {
  
    return <div className="castles-container" >{this.renderCastles()}</div>;

    }



}


export default Castles