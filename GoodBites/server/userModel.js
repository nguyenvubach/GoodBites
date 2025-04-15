const { client } = require('./db');

const dbName = 'Users'; // <- replace with your actual DB name
const collectionName = 'Userid'; // <- match your MongoDB collection

async function createUser(user) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(user);
  return result;
}

async function getUserById(id) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const user = await collection.findOne({ _id: id });
  return user;
}

async function getUserByEmail(email) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const user = await collection.findOne({ email });
  return user;
}

async function updateUser(id, update) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.updateOne({ _id: id }, { $set: update });
  return result;
}

async function deleteUser(id) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: id });
  return result;
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
};