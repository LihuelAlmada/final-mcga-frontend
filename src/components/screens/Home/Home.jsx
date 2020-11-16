import './style.css';
import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className="home">
                Welcome to Home
            </div>
        )
    };
};
export default Home;

