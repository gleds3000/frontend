import React, { Component } from 'react';
import api from '../services/api';

import imglike from "../like.svg";
import './Tweet.css';

export default class Tweet extends Component {
  handleLike = async () => {
    const { _id } = this.props.tweet;
    
    await api.post(`likes/${_id}`);
    console.log({ _id }); 
  }
  render() {
    const { tweet } = this.props;
    return  (
      <li className="tweet" >
        <strong>{tweet.autor}</strong>
        <p>{tweet.conteudo}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={imglike} alt="Like"/>
          {tweet.likes}
        </button>
      </li>
    );
  }
}
