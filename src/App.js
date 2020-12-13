import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
    state = {
        question: " ",
         answer: "wave",
         gifs: " ",
         show: false
    };
    //Fetching the API when site updates
    componentDidMount(){
        this.fetchData();
    }
    //Getting the Trivia and Giphy API
    fetchData = () => {
        this.setState({show: false})
        axios.get('https://jservice.io/api/random')
            .then((response) => {
                this.setState({
                    question: response.data[0].question,
                    answer: response.data[0].answer
                });
                //console.log(this.state.answer);
                axios.get('https://api.giphy.com/v1/gifs/search?q=' + this.state.answer + '&api_key=WSrG3pylt8cSeTIpKSYpdbcYJjYAyZhH&limit=1')
                .then((response) => {
                    this.setState({
                        gifs: response.data.data[0].images.fixed_height.url
                    });
                    //console.log(this.state.gifs);
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }
    revealAnswer = () => {
        this.setState({show: true})
    }
    render(){
        return (
            <div>
            <h2 className="outsideText">A Modern Twist on the Classic Jeopardy Game</h2> 
            <div className="cardApp">
                
                <div className="card">
                    <h1>{this.state.question}</h1>
                    <img src={this.state.gifs} alt="hint" />
                    <button className="revealButton" onClick={this.revealAnswer}>
                        {this.state.show ? <span>{this.state.answer}</span> : <span>Reveal Answer</span> }
                    </button>
                    <button className="button" onClick={this.fetchData}>
                        <span>Next Trivia Question</span>
                    </button>
                </div>
                
            </div>
            <h3 className="outsideText" id="h3">The gifs are related to the answer. Think creativly. If the gif is of "Frank and Beans" the clue may be in the word "Frank"</h3>
            </div>
        );
    }
}

export default App;