const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
let db;
let creatureCollection;
let forumCollection;

(async function testConnection() {
  try {
    await client.connect();
    db = client.db('startup');
    creatureCollection = db.collection('AllCreatures');
    forumCollection = db.collection('CreatureForum');
    await db.command({ ping: 1 });
    console.log('Connected to the database');
  } catch (error) {
    console.log(`Unable to connect to the database with ${url} because ${error.message}`);
    process.exit(1);
  }
})();

async function addCreature(creature) {
  const { creatureId, ...updatedCreature } = creature;
  const result = await creatureCollection.updateOne(
    { creatureId: creatureId },
    { $set: updatedCreature },
    { upsert: true }
  );
  return result;
}

function getAllCreatures() {
  const cursor = creatureCollection.find();
  return cursor.toArray();
}

async function addToForum(creature) {
  const { creatureId, ...updatedCreature } = creature;
  const result = await forumCollection.updateOne(
    { creatureId: creatureId },
    { $set: updatedCreature },
    { upsert: true }
  );
  return result;
}

function getForum() {
  const cursor = forumCollection.find();
  return cursor.toArray();
}

async function deleteCreature(creatureId) {
  const result = await creatureCollection.deleteOne(
    { creatureId: creatureId }
  );
  return result;
}

module.exports = { addCreature, getAllCreatures, deleteCreature, addToForum, getForum };