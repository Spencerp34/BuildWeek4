const router = require("express").Router();
const Dish = require('./dishes-model')
const restrictedAccess = require('../restrictedAccess')
const onlyVIPS = require('../onlyVIPs')

router.get('/',  restrictedAccess, async (req, res) => {
    const allDishes = await Dish.find()
    res.json(allDishes)
})

router.get('/:dish_id', restrictedAccess, async(req, res) => {
    const {dish_id} = req.params
    const theDish = await Dish.findByID(dish_id)
    res.json(theDish[0])
})

router.get('/:event_id/dishes', restrictedAccess, async(req, res) =>{
    const {event_id} = req.params
    const requestedDishes= await Dish.findRequested(event_id)
    res.json(requestedDishes)
})

router.post('/', restrictedAccess, onlyVIPS, async(req, res) => {
    const dish = req.body
    const newDish = await Dish.add(dish)
    res.json(newDish)
})

router.put('/:dish_id', restrictedAccess, async(req, res) => {
    const {dish_id} = req.params
    const changes = req.body
    const newDish = await Dish.edit(dish_id, changes)
    res.json(newDish[0])
    // res.status(200).json({message: 'edit is working'})
})

router.delete('/:dish_id', restrictedAccess, onlyVIPS, async(req, res) => {
    const {dish_id} = req.params
    const deletedDish = await Dish.remove(dish_id)
    res.json(deletedDish)
})

 
module.exports = router;