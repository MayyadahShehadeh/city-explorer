import React, { Component } from 'react'
import Header from './componants/Header';
import { Form ,Button, Alert } from 'react-bootstrap';
import axios from 'axios';


 class App extends Component {

constructor(props){
  super(props);
  this.state={
    cityName:'',
    longitude:'',
    latitude:'',
    alert: false,
  }
}



submitCity= async(e)=>{
  e.preventDefault()
  let axiosResponse=await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.064267016d83e6a3caea3cf7190b14a8&city=${this.state.cityName}&format=json`)
  this.setState({
    cityName: axiosResponse.data[0].display_name,
    longitude:axiosResponse.data[0].lon,
    latitude:axiosResponse.data[0].lat,
    alert: false,

    
  })
  
  console.log(axiosResponse.data)
}

componentDidCatch  (error) {
   this.setState({
    error: error.message,
    alert: true,
  

  })
}

cityChangeHandler = (e) => {
this.setState({
  cityName:e.target.value
})}


render() {
    return (
      <div>
        
        {this.state.alert &&
                    <Alert variant={'danger'}>
                        Error: 'Wrong Input! Enter City Name'
                    </Alert>}
        <Header/>
        {/* ----------------------------------- add bootsrap form ----------------- */}
        <Form onSubmit={this.submitCity}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter City Name</Form.Label>
            <Form.Control type="text" placeholder="Enter City Name" onChange={(e) => { this.cityChangeHandler(e) }} />
          </Form.Group>

          <Button variant="primary" type="submit">Explore!</Button>
        </Form>
        <h1>{this.state.cityName}</h1>
        <h1>{this.state.longitude}</h1>
        <h1>{this.state.latitude}</h1>
          {/* --------------------------------------------------------------------------- */}



      </div>
    )
  }
}

export default App
