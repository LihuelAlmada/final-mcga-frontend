import './style.css';
import React from 'react';
import { Link } from "react-router-dom";

class Home extends React.Component{
    render(){
        return(
            <div className="containerHome">
                <div className="header">
                    <div className="title">
                        <h1 className="text1">Notes App</h1>
                        <h1 className="text2">Welcome</h1>
                    </div>          
                    
                    
                </div>
            </div>
        );
    }
}

export default Home;