import React, { Component } from 'react'

 class App extends Component {

constructor(props){
  super(props);
  this.state={
    displayName:'',
    longitude:'',
    latitude:''
  }
}



cityChangeHandler = (e) => {
  console.log(e.target.value)
}

  render() {
    return (
      <div>
        <form>
          <input  type="text" placeholder="city name" onChange={(e)=> {this.cityChangeHandler(e)}} />
          <button>Explore!</button>
        </form>
        <h1>city name</h1>
        <h1>lat</h1>
        <h1>long</h1>

      </div>
    )
  }
}

export default App
