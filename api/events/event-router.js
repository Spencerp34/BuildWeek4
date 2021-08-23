const router = require("express").Router();
const Event = require('./event-model')

router.get('/',  async (req, res) => {
    const allEvents = await Event.find()
    res.json(allEvents)
})

router.get('/:event_id', async(req, res) => {
    const {event_id} = req.params
    const theEvent = await Event.findByID(event_id)
    res.json(theEvent)
})

router.post('/', async(req, res) => {
    const event = req.body
    const newEvent = await Event.add(event)
    res.json(newEvent)
})

router.put('/:event_id', async(req, res) => {
    const {event_id} = req.params
    const changes = req.body
    const newEvent = await Event.edit(event_id, changes)
    res.json(newEvent)
    // res.status(200).json({message: 'edit is working'})
})

router.delete('/:event_id', async(req, res) => {
    const {event_id} = req.params
    const deletedEvent = await Event.remove(event_id)
    res.json(deletedEvent)
})

 
module.exports = router;