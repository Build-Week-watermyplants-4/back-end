
const router = require('express').Router()
const Plant = require('./plants-model')


router.get('/', (req, res, next) => {
    Plant.get()
    .then(plants => {
        res.json(plants)
    })
    .catch(next)
})

router.get('/:plant_id', (req, res, next) => {
    Plant.getPlantById(req.params.plant_id)
    .then(plant => {
        res.status(200).json(plant)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the plants router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router