
const users = [
    {
        user_name: 'asd',
        user_password: '123',
        user_tel: '123-456-7890',
    },
]


const plants = [
    {
        plant_name: 'giant forest fern',
        plant_species: 'fern',
        plant_frequency: '8.25',
        user_id: 1,
    },
]


exports.seed = async function (knex) {
    await knex('users').insert(users)
    await knex('plants').insert(plants)
}