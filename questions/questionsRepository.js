const fs = require('fs');
const path = require('path');

class QuestionsRepository {
  constructor() {
    this.file = path.join(__dirname, 'questions.dat');
    this.questions = [];
    this.nextId = 1;
    if (fs.existsSync(this.file)) {
      fs.readFile(this.file, 'utf8', (err, data) => {
        if (err) {
          throw err.message;
        }
        this.questions = JSON.parse(data);
        this.questions.forEach(q => {
          if (q.id > this.nextId) {
            this.nextId = q.id;
          }
        });
        console.log(`Found ${this.questions.length}. Next ID was set to ${this.nextId}`);
      });
    } else {
      this._saveQuestions();
    }
  }

  findAll() {
    return this.questions;
  }

  findById(questionId) {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) {
      throw `No questions with ID '${questionId}' was found`;
    }
    return question;
  }

  add(question) {
    if (!question) {
      throw "Question not defined";
    }
    question.id = this.nextId;
    this.nextId++;
    this.questions.push(question);
    this._saveQuestions();
    return question;
  }

  deleteById(questionId) {
    const index = this.questions.findIndex(q => q.id === questionId);
    if (index < 0) {
      throw "Invalid question ID";
    }
    return this.questions.splice(index, 1);
  }

  _saveQuestions() {
    fs.writeFile(this.file, JSON.stringify(this.questions), 'utf8', (err) => {
      if (err) {
        throw err.message;
      }
    });
  }
}

const REPOSITORY = new QuestionsRepository();
module.exports = REPOSITORY;

