import React, { Component } from 'react'
import { Form ,Button,Image } from 'react-bootstrap';
import Weather from './Weather';
import axios from 'axios';

 class Main extends Component {

    constructor(props){
        super(props);
        this.state={
          cityName:'',
          lon:'',
          lat:'',
          displayError: false,
          displayMap: true,
          weatherData: []

        }
        console.log(this.state.weatherData);
      }
      
      
      submitCity= async(e)=>{
        e.preventDefault()
        try{ 
        let axiosResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.064267016d83e6a3caea3cf7190b14a8&city=${this.state.cityName}&format=json`)
        const axiosLocalApi= await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather?lat=31.95&lon=35.91&searchQuery=${this.state.cityName}`)

        this.setState({
          cityName: axiosResponse.data[0].display_name,
          lon:axiosResponse.data[0].lon,
          lat:axiosResponse.data[0].lat,
          displayError: false,
          displayMap: true,
          weatherData:axiosLocalApi.data
      
          
        });
     
      
        console.log(axiosLocalApi.data)
      }
        catch  (error) {
           this.setState({
            displayError: true,
          })
        }
      }
      
      
      
      cityChangeHandler = (e) => {
      this.setState({
        cityName:e.target.value
      })}
      

    render() {
        return (
            <div>
                {/*--------------------- to show error message -------------------------  */}
                {this.state.displayError &&
                   <p class="alert alert-warning" role="alert">
                   Error  : Wrong Input! Enter Valid City Name
                   </p>
                   }

        
        {/* ----------------------------------- add bootsrap form ----------------- */}
        <Form onSubmit={this.submitCity}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter City Name</Form.Label>
            <Form.Control type="text" placeholder="Enter City Name" onChange={(e) => { this.cityChangeHandler(e) }} />
          </Form.Group>

          <Button variant="primary" type="submit">Explore!</Button>
        </Form>
          <p>{this.state.cityName}</p>
          <p>{this.state.lon}</p>
          <p>{this.state.lat}</p>
          {/* --------------------------------------------------------------------------- */}
         
         {this.state.displayMap &&
         <div>

             <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.064267016d83e6a3caea3cf7190b14a8&center=${this.state.lat},${this.state.lon}&zoom=20&format=png`} rounded />        
         </div>
         }

            { this.state.weatherData.map(weatherData=>{
              
              return  <Weather desc={weatherData.description} date={weatherData.date}/>

            })
            }
            </div>
        )
    }
}

export default Main
