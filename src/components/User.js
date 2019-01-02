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
  console.log(window.location.pathname);
  if (user.castles.length > 0 ){
    return <>
        <Welcome user={user} />
        <CreateCastle user={user} updateCurrentUser={updateCurrentUser} />
        <Castles castles={user.castles} updateCurrentUser={updateCurrentUser} user={user} />
      </>;
  } else {
    return (
      <>
        <Welcome user={user} />
        <div className="no-castle-splash">
          You don't have any castles create one.
        </div>
        <CreateCastle user={user} updateCurrentUser={updateCurrentUser}/>
      </>
      )
  }
}

export default User; 
