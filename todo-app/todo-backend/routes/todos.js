const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const { setAsync, getAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const addedTodosValue = await getAsync('added_todos')
  if (!addedTodosValue) {
    await setAsync('added_todos', 1)
  } else {
    await setAsync('added_todos', Number(addedTodosValue) + 1)
  }
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo) // Implement this
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.done = !req.todo.done
  await req.todo.save()
  res.sendStatus(200) // Implement this
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
