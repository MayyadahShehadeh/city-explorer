import React, { Component } from 'react'
import { Form ,Button,Image } from 'react-bootstrap';
import Weather from './Weather';
import Movies from './Movies';
import axios from 'axios';
let iqKey=process.env.REACT_APP_LOCATIONIQ_API_KEY
// let PORT = process.env.REACT_APP_BACKEND_URL

 class Main extends Component {

    constructor(props){
        super(props);
        this.state={
          cityName:'',
          longitude:'',
          latitude:'',
          displayError: false,
          displayMap: true,
          weatherData: [],
          moviesData:[],

        }
        console.log(this.moviesData);
      }
      
      
      submitCity= async(e)=>{
        e.preventDefault()
        try{ 
          
          let axiosResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${iqKey}&city=${this.state.cityName}&format=json`)
          
          this.setState({
            longitude:axiosResponse.data[0].lon,
            latitude:axiosResponse.data[0].lat,
            displayError: false,
            displayMap: true,
            
            
          });
          
          const axiosLocalApi= await axios.get(`http://localhost:8000/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`)
          
          this.setState({
            weatherData:axiosLocalApi.data,
          });

          const movieApi= await axios.get(`http://localhost:8000/movies?city=${this.state.cityName}`)
          this.setState({
            moviesData: movieApi.data,

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
            <p>{this.state.longitude}</p>
            <p>{this.state.latitude}</p>
            {/* --------------------------------------------------------------------------- */}

            {this.state.displayMap &&
              <div>
                <Image src={`https://maps.locationiq.com/v3/staticmap?key=${iqKey}&center=${this.state.latitude},${this.state.longitude}&zoom=10&format=png`} />
              </div>
            }
            {/* ----------------------------------------------------------------------------------------------------------- */}
            {this.state.weatherData.map(value => {

              return <Weather desc={value.description} date={value.date} />
            })
            }
            {/* -----------------------------------for movies------------------------------- */}
            {
              this.state.moviesData.map(item => {
                return <Movies title={item.title} image_url={item.image_url}
                 overview={item.overview} vote_average={item.vote_average} />
              })}

          </div>
        )
    }
}

export default Main
