import React, { Component } from 'react'
import { Form ,Button, Image } from 'react-bootstrap';
import axios from 'axios';

 class Main extends Component {

    constructor(props){
        super(props);
        this.state={
          cityName:'',
          longitude:'',
          latitude:'',
          displayError: false,
          desplayMap: true,

        }
      }
      
      
      
      submitCity= async(e)=>{
        e.preventDefault()
        try{ let axiosResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.064267016d83e6a3caea3cf7190b14a8&city=${this.state.cityName}&format=json`)
        
        this.setState({
          cityName: axiosResponse.data[0].display_name,
          longitude:axiosResponse.data[0].lon,
          latitude:axiosResponse.data[0].lat,
          displayError: false,
          desplayMap: true,
      
          
        });
        
        console.log(axiosResponse.data)
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
                   Error 404 : Wrong Input! Enter Valid City Name
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
          {/* --------------------------------------------------------------------------- */}
         
         {this.state.desplayMap &&
         <div>
             <h1>{this.state.cityName}</h1>
             <h1>{this.state.longitude}</h1>
             <h1>{this.state.latitude}</h1>

        <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.064267016d83e6a3caea3cf7190b14a8&city=${this.state.latitude},${this.state.longitude}&zoom=10`} rounded />
        
         </div>
         }

            </div>
        )
    }
}

export default Main
