import React from 'react';
import Castles from './Castles'
import CreateCastle from "./CreateCastle";



const Welcome = ({user}) => {
  
  return(
  <div className="user-welcome">
    Welcome, {user.name}!
  </div>
  )
}


const User = ({ user, updateCurrentUser}) => {
  if (user.castles.length > 0 ){
    return <>
        <Welcome user={user} />
        <CreateCastle user={user} updateCurrentUser={updateCurrentUser} />
        <Castles castles={user.castles} />
      </>;
  } else {
    return <>
        <Welcome user={user} />
        <div>
          You don't have any castles create one.
        <CreateCastle user={user} updateCurrentUser={updateCurrentUser}/>
        </div>
      </>;
  }
}

export default User; 
