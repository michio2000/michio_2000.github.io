const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos (HTML) desde una carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar mensajes de chat
  socket.on('chat message', (msg) => {
    // Retransmitir el mensaje a todos los usuarios conectados
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000; // Asegura compatibilidad con servicios como Heroku
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});