const express = require('express');
const bodyParser = require('body-parser');
const questionsRouter = require('./questions/quertionsRouter');
const gameRouter = require('./game/gameRouter');

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.use('/questions', questionsRouter);
app.use('/game', gameRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

