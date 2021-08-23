const db = require('../data/db-config')

async function find(){
    return await db('dishes').select('dish_id', 'dish_name', 'event_id',)
}

async function findByID(id){
    return await db('dishes').where('dish_id', id).select('dish_id', 'dish_name', 'event_id')
}

async function add(user){
    const [newDishObj] = await db('dishes').insert(user, ['dish_id', 'dish_name', 'event_id'])
    return newDishObj 
}

async function edit(dish_id, changes){
    const {dish_name} = changes
    await db('dishes').where('dish_id', dish_id).update({dish_name})
    
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
    add,
    edit,
    remove,
}