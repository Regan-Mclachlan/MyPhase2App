import React, { Component } from 'react'


export default class LikeButton extends Component{
    state = {liked: false}
    toggle = () => {
        let clicked = this.state.liked;
        clicked = !clicked
        this.setState({liked: clicked})
    }
    render(){
        return(
            <div className='container' onClick={() => this.toggle()}>
                {this.state.liked ===  false ? ('❤') : ('❤️')}
            </div>
        )
    }
}