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
        <tr key={idea._id} className="content-wrapper">
            <td>
              <tr>
                <td className="description">{idea.description}</td>
              </tr>
              <tr>
                <td className="email">Submitted by {idea.name}</td>
              </tr>
            </td>
            <td className="vote-container">
              <i className="fa fa-thumbs-up upvote" data-id={idea._id} data-count={idea.__v} onClick={this.upVote}></i>
              {idea.__v}
            </td>
        </tr>
      )
    })

    return (
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <td className="header">Idea</td>
            <td className="header">Votes</td>
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
