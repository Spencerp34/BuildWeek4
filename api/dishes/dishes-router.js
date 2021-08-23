const router = require("express").Router();

router.get('/',  async (req, res) => {
    res.json({message: 'get dishes is hooked up'})
})


router.get('/:id',  async (req, res) => {
    res.status(200).json({message: 'get dishes by ID is hooked up'})
})

router.post('/',  async (req, res) => {
    res.status(200).json({message: 'Create new dish is hooked up'})
})

router.put('/:id',  async (req, res) => {
    res.status(200).json({message: 'edit dish is hooked up'})
})

router.delete('/:id',  async (req, res) => {
    res.status(200).json({message: 'delete dish is hooked up'})
})

module.exports = router