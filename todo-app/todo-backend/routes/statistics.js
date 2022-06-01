const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

router.get('/', async (req, res) => {
  const todosAdded = await getAsync('added_todos')
  console.log(todosAdded);
  res.json({added_todos: todosAdded})
})

module.exports = router