// boom import
const boom = require('boom')

// get todo model
const Todo = require('../models/Todo')

// Get all todos
exports.getTodos = async (req, reply) => {
  try {
    const todos = await Todo.find()
    return todos
  } catch (err) {
    throw boom.boomify(err)
  }
}

// get single todo by ID
exports.getSingleTodo = async (req, reply) => {
  try {
    const id = req.params.id
    const todo = await Todo.findById(id)
    return todo
  } catch (err) {
    throw boom.boomify(err)
  }
}

// add a new todo
exports.addTodo = async (req, reply) => {
  try {
    const todo = new Todo(req.body)
    return todo.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// update an existing todo
exports.updateTodo = async (req, reply) => {
  try {
    const id = req.params.id
    const todo = req.body
    const { ...updateData } = car
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// delete a todo
exports.deleteTodo = async (req, reply) => {
  try {
    const id = req.params.id
    const todo = await Todo.findByIdAndRemove(id)
    return todo
  } catch (err) {
    throw boom.boomify(err)
  }
}