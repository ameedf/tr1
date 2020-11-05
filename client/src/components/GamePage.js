import React, { Component } from 'react';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      rightAnswers: 0,
      wrongAnswers: 0,
      question: null,
    }
  }

  componentDidMount() {
    this.loadNextQuestion();
  }

  checkAnswer(trueOrFalse) {
    const answer = { questionId: this.state.question.id, userAnswer: trueOrFalse }
    fetch('/game/check', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    }).then(res => res.json())
      .then(checkedAnswer => {
        if (checkedAnswer.result === 'RIGHT') {
          this.setState({ rightAnswers: this.state.rightAnswers + 1 })
        } else {
          this.setState({ wrongAnswers: this.state.wrongAnswers + 1 })
        }
        this.loadNextQuestion();
      })
  }

  loadNextQuestion() {
    fetch('/game/next')
      .then(response => response.json())
      .then(q => this.setState({ question: q }));
  }
  render() {
    if (this.state.question === null) {
      return <h1>Loading...</h1>
    }
    const questionsAnswered = this.state.rightAnswers + this.state.wrongAnswers;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Right</th>
              <th>Wrong</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.rightAnswers}</td>
              <td>{this.state.wrongAnswers}</td>
            </tr>
          </tbody>
        </table>
        <br /><hr /><br />
        <h1>Question #{questionsAnswered}: {this.state.question.text}</h1>
        <button onClick={() => this.checkAnswer(true)}>True</button>
        <button onClick={() => this.checkAnswer(false)}>False</button>
      </div>
    );
  }
}

export default GamePage;