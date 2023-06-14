// const http = require('http');
// const server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write(`<h1>Hello Node.js! [${req.method}] ${req.url}</h1>`);
//   res.end();
// });

// server.listen(8080, () => {
//   console.log(`Web service listening on port 8080`);
// });

const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get('/user/:username', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
    const token = req?.cookies.token;
    res.send({ username: user.username, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetCreature
secureApiRouter.get('/creatures', async (_req, res) => {
  const creatures = await DB.getAllCreatures();
  res.send(creatures);
});

// SubmitCreature
secureApiRouter.post('/creature', async (req, res) => {
  DB.addCreature(req.body);
  const creatures = await DB.getAllCreatures();
  res.send(creatures);
});

// GetForum
secureApiRouter.get('/forum', async (_req, res) => {
  const forum = await DB.getForum();
  res.send(forum);
});

// UploadCreature
secureApiRouter.post('/upload', async (req, res) => {
  DB.addToForum(req.body);
  const forum = await DB.getForum();
  res.send(forum);
});

secureApiRouter.post('/delete', (req, res) => {
  console.log('Delete Request Body:', req.body); // Add this line to log the request body
  DB.deleteCreature(req.body);
  res.sendStatus(200);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

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

