import React, { Component } from 'react';

class QuestionsPage extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      newQuestion: {
        text: '',
        rightAnswer: '',
      },
    }
  }

  handleAnswerChanged(answer) {
    const newQuestion = { ...this.state.newQuestion }
    newQuestion.rightAnswer = answer === 'yes';
    this.setState({ newQuestion })
  }

  componentDidMount() {
    fetch('/questions')
      .then(res => res.json())
      .then(questions => this.setState({ questions }));
  }

  handleTextChanged(text) {
    const newQuestion = { ...this.state.newQuestion }
    newQuestion.text = text;
    this.setState({ newQuestion })
  }

  addAnswer() {
    fetch('/questions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.newQuestion)
    }).then(res => res.json())
      .then(newQuestion => this.setState({ questions: [...this.state.questions, newQuestion] }));
  }

  render() {
    return (
      <div>
        <div>
          <h1>Add question</h1>
          Question: <input type="text" value={this.state.newQuestion.text} onChange={(event) => this.handleTextChanged(event.target.value)} />
          <div onChange={(event) => this.handleAnswerChanged(event.target.value)}>
            Answer: <input type="radio" name="answer" value="yes" />Yes
            <input type="radio" name="answer" value="no" /> No
            <br /> <br /> <button onClick={() => this.addAnswer()}>Add</button>
          </div>
          <hr />
          <br />
        </div>
        {this.state.questions.length > 0 &&
          <div>
            <table>
              <thead>
                <tr>
                  <th>Text</th>
                  <th>Right answer</th>
                </tr>
              </thead>
              <tbody>
                {this.state.questions.map(q => (
                  <tr>
                    <td>{q.text}</td>
                    <td>{q.rightAnswer + ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
      </div>
    );
  }
}

export default QuestionsPage;