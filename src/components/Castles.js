import React, { Component } from 'react'
import Castle from './Castle'

class Castles extends Component {

  renderCastles = () => {
    return this.props.castles.map(castle => <Castle castle={castle} key={castle.id}/>)
  }



  render() {
  
    return(
      <div>{this.renderCastles()}</div>
    )

    }



}


export default Castles