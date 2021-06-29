import React, { Component } from 'react'

 class Weather extends Component {
    render() {
        return (
            <div>
             <p>
                {this.props.desc} 
             </p>
             <p>
                 {this.props.date}
             </p>
            </div>
        )
    }
}

export default Weather
