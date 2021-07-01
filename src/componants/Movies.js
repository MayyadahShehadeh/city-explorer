import React, { Component } from 'react'

 class Movies extends Component {
    render() {
        return (
            <>
             <p>{this.props.title}</p>
             <img src={this.props.image_url} />
             <p>{this.props.overview}</p>

           
                </>
        )
    }
}

export default Movies
