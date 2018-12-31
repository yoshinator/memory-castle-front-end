import React from 'react';





const Memory = ({ memory }) => {

  return (
  <div className ="memory" style={{left: `${memory.x}`, top: `${memory.y}` }}> {memory.text}</div>
  )
}


export default Memory; 
