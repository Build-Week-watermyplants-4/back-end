
const router = require('express').Router()
const md = require('./plants-middleware')
const Plant = require('./plants-model')


router.get('/', async (req, res, next) => {
    try {
        const plants = await Plant.get()
        res.json(plants)
    } catch (err) {
        next(err)
    }
})

router.get('/:plant_id', md.checkPlantId, async (req, res, next) => {
    try {
        const plant = await Plant.getPlantById(req.params.plant_id)
        res.json(plant)
    } catch (err) {
        next(err)
    }
})

router.post('/', md.checkPlantPayload, md.checkPlantUnique, async (req, res, next) => {
    try {
        const newPlant = await Plant.addPlant(req.body)
        res.status(201).json(newPlant)
    } catch (err) {
        next(err)
    }
})

router.put('/:plant_id', md.checkPlantId, md.checkPlantPayload, md.checkPlantUnique, async (req, res, next) => {
    try {
        const updated = await Plant.updateById(req.params.plant_id, req.body)
        res.json(updated)
    } catch (err) {
        next(err)
    }
})

router.delete('/:plant_id', md.checkPlantId, async (req, res, next) => {
    try {
        await Plant.deleteById(req.params.plant_id)
        res.json(req.plant)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router