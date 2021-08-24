const db = require('../data/db-config')

async function find(){
    const dishResults = await db('dishes as d')
        .leftJoin('users as u', 'd.user_id', 'u.user_id')
        .select('d.dish_id', 'd.dish_name', 'd.event_id', 'u.username')

    return dishResults
}

async function findByID(id){
    const dishResults = await db('dishes as d')
        .leftJoin('users as u', 'd.user_id', 'u.user_id')
        .where('d.dish_id', id)
        .select('d.dish_id', 'd.dish_name', 'd.event_id', 'u.username')
    return dishResults
}

async function findRequested(event_id){
    return await db('dishes').where('event_id', event_id).select('dish_id', 'dish_name')
}

async function add(user){
    const [newDishObj] = await db('dishes').insert(user, ['dish_id', 'dish_name', 'event_id'])
    return newDishObj 
}

async function edit(dish_id, changes){
    const {dish_name, event_id, user_id} = changes
    await db('dishes').where('dish_id', dish_id).update({dish_name, event_id, user_id})
    
    const updated = findByID(dish_id)
    return updated
}

async function remove(dish_id){
    const toBeDeleted = findByID(dish_id)
    await db('dishes').where('dish_id', dish_id).del()

    return toBeDeleted
}

module.exports={
    find,
    findByID,
    findRequested,
    add,
    edit,
    remove,
}