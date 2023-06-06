// const http = require('http');
// const server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write(`<h1>Hello Node.js! [${req.method}] ${req.url}</h1>`);
//   res.end();
// });

// server.listen(8080, () => {
//   console.log(`Web service listening on port 8080`);
// });

const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetCreature
apiRouter.get('/creatures', (_req, res) => {
  const creatures = DB.getAllCreatures();
  res.send(creatures);
});

// SubmitCreature
apiRouter.post('/creature', (req, res) => {
  DB.addCreature(req.body);
  const creatures = DB.getAllCreatures();
  res.send(creatures);
});

// GetForum
apiRouter.get('/forum', (_req, res) => {
  const forum = DB.getForum();
  res.send(forum);
});

// UploadCreature
apiRouter.post('/upload', (req, res) => {
  DB.addToForum(req.body);
  const forum = DB.getForum();
  res.send(forum);
});

apiRouter.post('/delete', (req, res) => {
  console.log('Delete Request Body:', req.body); // Add this line to log the request body
  DB.deleteCreature(req.body);
  res.sendStatus(200);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// let creatures = [];
// let forum = [];
// function updateCreatures(newCreature, creatures) {
//   const existingCreatureIndex = creatures.findIndex(
//     (creature) => creature.creatureId === newCreature.creatureId
//   );

//   if (existingCreatureIndex !== -1) {
//     creatures[existingCreatureIndex] = newCreature;
//   } else {
//     creatures.push(newCreature);
//   }

//   return creatures;
// }

// function updateForum(uploadedCreature, forum) {
//   for (var i = 0; i < forum.length; i++) {
//     if (forum[i].creatureId == uploadedCreature.creatureId) {
//       forum.splice(i, 1);
//       break;
//     }
//   }

//   forum.push(uploadedCreature);
//   return forum;
// }

// function deletePersonalCreature(index) {
//   creatures.splice(index, 1);
// }

