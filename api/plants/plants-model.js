function getPlantById(plant_id) {
    return Promise.resolve(`awesome plant with id ${plant_id}`)
}

module.exports = {getPlantById}