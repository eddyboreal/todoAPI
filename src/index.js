const fastify = require('fastify')();
const mongoose = require('mongoose');
const routes = require('./routes');

// connect to MongoDB
mongoose.connect('mongodb://localhost/mycargarage')
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))


// add all routes in fastify
routes.forEach((route, index) => {
  fastify.route(route);
});

// running the server
fastify.listen(3000, function(err, address) {
  if(err) {
    console.log(err);
    process.exit(1);
  };
  console.log(`server running on ${address}`);
});