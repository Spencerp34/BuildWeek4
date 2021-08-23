const db = require('../data/db-config')

async function find(){
    return await db('events').select('event_name', 'date', 'location')
}

async function findByID(id){
    return await db('events').where('event_id', id).select('event_id', 'event_name', 'date', 'location')
}

async function add(user){
    const [newEventObj] = await db('events').insert(user, ['event_id', 'event_name', 'date', 'location'])
    return newEventObj 
}

async function edit(event_id, changes){
    const {event_name, date, location} = changes
    await db('events').where('event_id', event_id).update({event_name, date, location})
    
    const updated = findByID(event_id)
    return updated
}

async function remove(event_id){
    const toBeDeleted = findByID(event_id)
    await db('events').where('event_id', event_id).del()

    return toBeDeleted
}

module.exports={
    find,
    findByID,
    add,
    edit,
    remove,
}