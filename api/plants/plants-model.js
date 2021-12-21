
const db = require('../../data/db-config')


function get() {
    return db('plants')
}

function getPlantById(plant_id) {
    return Promise.resolve(`awesome plant with id ${plant_id}`)
}

function addPlant({plant_name}) {
    return db('plants')
}

module.exports = {get, getPlantById, addPlant}