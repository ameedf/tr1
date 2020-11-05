const express = require('express');
const router = express.Router();
const repository = require('./questionsRepository');

router.get('/', (req, res) => {
  res.send(repository.findAll());
});

router.post('/', (req, res) => {
  const question = req.body;
  res.send(repository.add(question));
});

router.get('/:id', (req, res) => {
  res.send(repository.findById(req.params.id));
});

router.delete('/:id', (req, res) => {
  res.send(repository.deleteById(req.params.id));
});

module.exports = router;