import React, { Component } from 'react';
import Users from "./components/Users";

class App extends Component {
  

  render() {
    return (
    <div className="App">
        <header className="App-header">
          Welcome to Memory Castle
        </header>
        <div className="intro">
          A memory palace is an imaginary location in
          your mind where you can store mnemonic images. The most common
          type of memory palace involves making a journey through a place
          you know well, like a building or town. Along that journey there
          are specific locations that you always visit in the same order.
          <a href="https://sansforgetica.rmit/" rel="noopener noreferrer" target="_blank">On your journey you will see this crazy font. Its a font developed by MIT. It's scientifically designed to help you remember things. </a>
        </div>
        <Users/>
      </div>
    )
  }
}

export default App;



