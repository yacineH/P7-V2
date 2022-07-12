const http =require('http');
const app = require('./app');

//recuparation du port et assignation du port a app
const port = process.env.PORT;
app.set('port', port);

/**
 * Permet d'afficher dans la console le type d'erreur
 * @param {error} error 
 */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//creation du serveur
const server = http.createServer(app);

//ajout des events error,listening avec leur callback
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//server en marche est en etat d'ecoute sur le port definie dans notre .env
server.listen(port);