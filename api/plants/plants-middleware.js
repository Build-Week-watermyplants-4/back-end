
const Plant = require('./plants-model')
const db = require('../../data/db-config')

exports.checkPlantId = async (req, res, next) => {
    try {
        const plant = await Plant.getPlantById(req.params.plant_id)
        if (!plant) {
            next({status: 404, message: 'not found'})
        } else {
            req.plant = plant
            next()
        }
    } catch (err) {
        next(err)
    }
}

exports.checkPlantPayload = (req, res, next) => {
    const error = {status: 400}
    const {plant_name, plant_species, plant_frequency} = req.body
    if (plant_name === undefined || plant_species === undefined || plant_frequency === undefined) {
        error.message = 'name species and frequency are required'
        next(error)
    } else if (typeof plant_name !== 'string') {
        error.message = 'name of plant must be a string'
        next(error)
    } else if (plant_name.trim().length < 3 || plant_name.trim().length > 100) {
        error.message = 'name of plant must be between 3 and 100'
        next(error)
    } else {
        next()
    }
}

exports.checkPlantUnique = async (req, res, next) => {
    try {
        const exists = await db('plants')
        .where('plant_name', req.body.plant_name.trim()).first()
        
        if (exists) {
            next({status: 400, message: 'that name is taken'})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}