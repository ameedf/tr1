const express = require('express');
const router = express.Router();
const questionsRepository = require('../questions/questionsRepository');

router.post('/check', (req, res) => {
  const answer = req.body; // {questionId, userAnswer}
  const question = questionsRepository.findById(parseInt(answer.questionId));
  if (!question) {
    res.status(400).send({ message: "Illegal question ID" });
  } else {
    if ((question.rightAnswer && answer.userAnswer) ||
      (!question.rightAnswer && !answer.userAnswer)) {
      res.send({ result: "RIGHT" });
    } else {
      res.send({ result: "WRONG" });
    }
  }
});

router.get('/next', (req, res) => {
  const questions = questionsRepository.findAll();
  if (questions.length === 0) {
    res.send(null);
  } else {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = { ...questions[randomIndex] };
    delete question.rightAnswer;
    res.send(question);
  }
});
module.exports = router;