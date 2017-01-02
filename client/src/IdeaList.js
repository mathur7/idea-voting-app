import React, { Component } from 'react';

class IdeaList extends Component {
  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this);
  }

  upVote(event) {
    var id = event.target.dataset.id;
    var vote = parseInt(event.target.dataset.count, 10);
    this.props.onVoteSubmit(id, vote);
  }

  render() {
    var ideas = this.props.ideas.map((idea) => {
      return (
        <tr key={idea._id}>
          <td>{idea.description}</td>
          <td>{idea.email}</td>
          <td>{idea.__v}</td>
          <td><button data-id={idea._id} data-count={idea.__v} onClick={this.upVote}>upvote</button></td>
        </tr>
      )
    })

    return (
      <table>
        <thead>
          <tr>
            <td>Idea</td>
            <td>Submitted By</td>
            <td>Votes</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {ideas}
        </tbody>
      </table>
    )
  }
}

export default IdeaList;
