import TodoController from './api/v1/todo_controller';

const express = require('express');
const app = express();
const port = 3300;

TodoController(app);

app.listen(port, () => {
  console.log(`ToDo API Running on port ${port}`);
});
