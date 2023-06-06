const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const creatureCollection = db.collection('AllCreatures');
const forumCollection = db.collection('CreatureForum');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addCreature(creature) {
  db.creatureCollection.replaceOne (
    { creatureId: creature.creatureId },
    creature,
    { upsert: true }
  );
  const result = await creatureCollection.insertOne(creature);
  return result;
}

function getAllCreatures() {
  const cursor = creatureCollection.find();
  return cursor.toArray();
}

async function addToForum(creature) {
  db.forumCollection.replaceOne (
    { creatureId: creature.creatureId },
    creature,
    { upsert: true }
  );
  const result = await forumCollection.insertOne(creature);
  return result;
}

function getForum() {
  const cursor = forumCollection.find();
  return cursor.toArray();
}

function deleteCreature(creatureId) {
  db.creatureCollection.remove(
    { creatureId: creatureId }
  )
}

module.exports = { addCreature, getAllCreatures, deleteCreature, addToForum, getForum };
