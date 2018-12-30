import React, { Component } from 'react'
import Castle from './Castle'

class Castles extends Component {

  renderCastles = () => {
    return this.props.castles.map(castle => <Castle castle={castle} key={castle.id} updateCurrentUser={this.props.updateCurrentUser} user={this.props.user} />)
  }



  render() {
  
    return <div className="castles-container" >{this.renderCastles()}</div>;

    }



}


export default Castles