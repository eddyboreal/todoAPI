const fastify = require('fastify')();



// running the server
fastify.listen(3000, function(err, address) {
  if(err) {
    console.log(err);
    process.exit(1);
  };
  console.log(`server running on ${address}`);
});