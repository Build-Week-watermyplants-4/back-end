
const db = require('../../data/db-config')


function get() {
    return db('plants')
}

function getPlantById(plant_id) {
    return db('plants').where('plant_id', plant_id).first()
}

const addPlant = async plant => {
    const [plant_id] = await db('plants').insert(plant)
    return getPlantById(plant_id) 
}

const updateById = async (plant_id, plant) => {
    await db('plants').where('plant_id', plant_id).update(plant)
    return getPlantById(plant_id)
}

const deleteById = plant_id => {
    return db('plants').where('plant_id', plant_id).del()
}

module.exports = {get, getPlantById, addPlant, updateById, deleteById}