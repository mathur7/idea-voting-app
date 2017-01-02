import React, { Component } from 'react';
import InputForm from './InputForm';
import IdeaList from './IdeaList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: []
    }
    this.fetchIdeas = this.fetchIdeas.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.parseJSON = this.parseJSON.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.upVote = this.upVote.bind(this);
  }

  handleInputSubmit(data) {
    var self = this;
    var url = 'http://localhost:8080/api/ideas';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        data: data
      })
    }).then(self.parseJSON)
      .then(function(data){ 
        var ideas = self.state.ideas || [];
        ideas.push(data.idea);
        self.setState({
          ideas: ideas
        })
      })
      .catch(function (error) {  
        console.log('Request failure: ', error);  
      });
  }

  upVote(id, vote) {
    var self = this;
    var url = 'http://localhost:8080/api/ideas/' + id;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        __v: vote+1
      })
    }).then(function(res) {
        return res.json();
      })
      .then(function(data){ 
        var ideas = self.state.ideas || [];
        var idx = ideas.findIndex(x => x._id === data.idea._id);
        ideas[idx] = data.idea;
        self.setState({
          ideas: ideas
        })
      })
      .catch(function (error) {  
        console.log('Request failure: ', error);  
      });
  }

  fetchIdeas() {
    var self = this;
    var url = 'http://localhost:8080/api/ideas';
    fetch(url, {
      accept: 'application/json'
      }).then(self.checkStatus)
      .then(self.parseJSON)
      .then(function (response) {
        self.setState({
          ideas: response
        })
      })
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText)
      error.response = response;
      throw error;
    }
  }

  parseJSON(response) {
    return response.json();
  }


  componentDidMount() {
    this.fetchIdeas();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Atreyee's 30 on 30</h2>
        </div>
        <div className="App-intro">
          <InputForm onInputSubmit={this.handleInputSubmit}/>
          <IdeaList ideas={this.state.ideas} onVoteSubmit={this.upVote} />
        </div>
      </div>
    );
  }
}

export default App;
