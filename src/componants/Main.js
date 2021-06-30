import React, { Component } from 'react'
import { Form ,Button,Image } from 'react-bootstrap';
import Weather from './Weather';
import axios from 'axios';
let iqKey=process.env.REACT_APP_LOCATIONIQ_API_KEY

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
          // movieData=[]

        }
        console.log(this.state.weatherData);
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

          // const moviApi= await axios.get(`${KeyLocal}/movies?city=${this.state.cityName}`)
          // this.setState({
          //   movieData:moviApi.data,
          //   cityName: moviApi.data[0].display_name,
          // });


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

            {/* {
              this.state.moviesData.map(value => {
                return <Movies title={value.title} image_url={value.image_url}
                vote_average={value.vote_average} />
              })} */}

          </div>
        )
    }
}

export default Main
