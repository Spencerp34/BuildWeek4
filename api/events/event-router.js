const router = require("express").Router();

router.get('/',  async (req, res) => {
    res.json({message: 'get potlucks is working'})
})

router.get('/:id', async(req, res) => {
    res.json({message: 'get by id potlucks is working'})
})

router.post('/', async(req, res) => {
    res.json({message: 'add potlucks is working'})
})

router.put('/:id', async(req, res) => {
    res.json({message: 'edit potlucks is working'})
})

router.delete('/:id', async(req, res) => {
    res.json({message: 'delete potlucks is working'})
})

 
module.exports = router;