import React from 'react'

export default function Castle(props) {
  return (
    <div className="castle-card">
      <h2 className="castle-card-header">{props.castle.name}</h2>
      <img src={props.castle.image} alt={props.castle.name}/>

    </div>
  )
}


