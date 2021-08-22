const db = require('../data/db-config')

async function find(){
    return await db('users').select('user_id', 'username', 'role')
}

async function findByID(id){
    return await db('users').where('user_id', id).select('user_id', 'username', 'role')
}

async function findByFilter(filter){
    return await db('users').where({filter}).select('user_id', 'username', 'role')
}

async function add(user){
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'role'])
    return newUserObject 
}

//From the template

// async function insertUser(user) {
//     // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//     // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//     // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//     const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//     return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

module.exports={
    find,
    findByID,
    findByFilter,
    add
}