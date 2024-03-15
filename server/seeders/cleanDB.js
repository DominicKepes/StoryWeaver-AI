/*
const models = require('../../../models');
const db = require('../../../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
*/


const db = require('../config/connection');

const cleanDB = async (modelName, collectionName) => {
    try {
        // Check if the collection exists
        const collection = db.collection(collectionName);
        if (collection) {
            // Drop the collection
            await collection.drop();
            console.log(`Collection '${collectionName}' dropped successfully.`);
        }
    } catch (err) {
        throw err;
    }
};

module.exports = cleanDB;
