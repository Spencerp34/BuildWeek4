const db = require('../data/db-config')

async function find(){
    const result = await db('events').select('event_id', 'event_name', 'date', 'location')
    const dishResults = await db('dishes as d')
        .leftJoin('users as u', 'd.user_id', 'u.user_id')
        .select('d.dish_id', 'd.dish_name', 'd.event_id', 'u.username')
    const events =  result.map(result => {
        const formattedData = {
            event_id: result.event_id,
            event_name: result.event_name,
            event_date: result.date,
            event_location: result.location,
            event_dishes: []
        }
        
        dishResults.map(dish => {
            if(dish.event_id === formattedData.event_id){
                formattedData.event_dishes.push({
                    dish_name: dish.dish_name,
                    reserved: dish.username
                })
            }
        })
        
        
        return formattedData
    })
    
    return events
}

async function findByID(id){
    const result = await db('events').where('event_id', id).select('event_id', 'event_name', 'date', 'location')
    const dishResults = await db('dishes as d')
        .leftJoin('users as u', 'd.user_id', 'u.user_id')
        .select('d.dish_id', 'd.dish_name', 'd.event_id', 'u.username')
    const events =  result.map(result => {
        const formattedData = {
            event_id: result.event_id,
            event_name: result.event_name,
            event_date: result.date,
            event_location: result.location,
            event_dishes: []
        }
        
        dishResults.map(dish => {
            if(dish.event_id === formattedData.event_id){
                formattedData.event_dishes.push({
                    dish_name: dish.dish_name,
                    reserved: dish.username
                })
            }
        })
        return formattedData
    })
    return events[0]
}

async function add(user){
    const [newEventObj] = await db('events').insert(user, ['event_id', 'event_name', 'date', 'location'])
    const formattedData = {
        ...newEventObj,
        event_dishes: []
    }
    return formattedData 
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