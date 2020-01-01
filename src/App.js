import React from 'react';
import './App.css';
import { subscribeToTimer,socket } from './api';


class App extends React.Component {

    constructor(props) {
        super(props);
        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));

        socket.on("chat message", msg => {
            this.setState({
                chatMessages: [...this.state.chatMessages, msg]
            });
        });

    }
    state = {
        timestamp: 'no timestamp yet',
        chatMessages: [],
        message: ''
    };

    submitChatMessage = () => {

        socket.emit('chat message', this.state.message);
         this.setState({message: ''});
    }

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    This is the timer value: {this.state.timestamp}
                </p>
                <p>{this.state.chatMessages.map( (el) => <div>{el}</div>)}</p>
                <input  value={this.state.message} onChange={this.handleChange} name="message"/>
                <button onClick={this.submitChatMessage}>Wyślij</button>
            </div>
        );
    }
}

export default App;
