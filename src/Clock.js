import React from 'react';
import useState from 'react';
import ReactDOM from 'react-dom';

export default class Clock extends React.Component {
    constructor (props){
        super(props)
        this.state = {
            count: 0
        };
    }
    componentDidMount(){
        this.myInterval = setInterval(
            () => {
                this.setState(prevState =>({
                    count: prevState.count + 1
                }))
            }, 
            1000
        )
    }

    componentWillUnmount(){
        clearInterval(this.myInterval);
    }
    
    render(){
        const {count} = this.state
        return <div> Time: {count} </div> 
    }

}



