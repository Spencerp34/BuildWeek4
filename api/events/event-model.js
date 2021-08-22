const db = require('../data/db-config')

async function find(){
    return await db('events').select('event_id', 'username', 'role')
}

async function findByID(id){
    return await db('events').where('event_id', id).select('event_id', 'username', 'role')
}


async function add(user){
    const [newEventObj] = await db('events').insert(user, ['event_id', 'username', 'role'])
    return newEventObj 
}

module.exports={
    find,
    findByID,
    add
}