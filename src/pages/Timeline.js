import React, { Component } from 'react';
import socket from 'socket.io-client';

import api from '../services/api';

import twitterlogo from '../twitter.svg';
import './Timeline.css';

import Tweet  from '../components/Tweet'
require('dotenv').config();
export default class Timeline extends Component {
    state = {
      tweets: [],
      newTweet: '',
    }

async componentDidMount(){
      this.subscribeToEvents();

        const response = await api.get('tweets');
     
        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const io = socket(process.env.REACT_APP_BASE_URL);
    
        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] });
        });
        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map( tweet => 
                (tweet._id === data._id ? data : tweet)
                )
            });
        });
    }

    handleNewTweet = async e =>{
        if (e.keyCode !== 13 ) return;
      
        const conteudo =  this.state.newTweet;
        const autor = localStorage.getItem('@Gotwitter:username');

        await api.post('tweets', { conteudo, autor });

        this.setState({newTweet: '' });
   }

  handleInputChange = e =>{
      this.setState({ newTweet: e.target.value });
  };

    render() {
      return (
        <div className='timeline-wrapper'>
            <img height={24} src={twitterlogo} alt="Gotwitter"/>
            <form>
                <textarea
                value={this.state.newTweet}
                onChange={this.handleInputChange}
                onKeyDown={this.handleNewTweet}
                placeholder="o que está acontecendo"  
                />
            </form> 
            <ul className="tweet-list">
                {this.state.tweets.map(tweet =>(
                    <Tweet key={tweet._id} tweet={tweet} />
                ))}
            </ul>  
        </div>
    );
  }
}
