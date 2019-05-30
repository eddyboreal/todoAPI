// import our controllers
const todoController = require('../controllers/todoController');

// routes declarations

const routes = [
  {
    method: 'GET',
    url: '/api/todos',
    handler: todoController.getTodos
  },
  {
    method: 'GET',
    url: '/api/todos/:id',
    handler: todosController.getSingleTodo
  },
  {
    method: 'POST',
    url: '/api/todos',
    handler: todoController.addTodo,
  },
  {
    method: 'PUT',
    url: '/api/todos/:id',
    handler: todoController.updateTodo
  },
  {
    method: 'DELETE',
    url: '/api/todos/:id',
    handler: todoController.deleteTodo
  }
];

module.exports = routes;