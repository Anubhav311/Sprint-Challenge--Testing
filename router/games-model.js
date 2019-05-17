const db = require('../database/dbConfig.js');

module.exports = {
    find,
    add,
    findById,
};

function find() {
  return db('games')
}

async function add(user) {
    const [id] = await db('games').insert(user);
  
    return findById(id);
}

function findById(id) {
    return db('games')
      .where({ id })
      .first();
  }