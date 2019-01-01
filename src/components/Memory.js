import React from 'react';





const Memory = ({ memory, deleteMemory, updateMemory}) => {

  return (
  <div className="memory" id={`memory-${memory.id}`} style={{left: `${memory.x}`, top: `${memory.y}` }} onClick={event => updateMemory(memory.id, event)}> {memory.text}
  <button className="delete-memory" onClick={() => deleteMemory(memory.id)}>X</button>
  </div>
  )
}


export default Memory; 
