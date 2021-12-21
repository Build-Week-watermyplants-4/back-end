
const db = require('../../data/db-config')


function get() {
    return db('users')
}

function getUserById(user_id) {
    return db('users').where('user_id', user_id).first()
}

const addUser = async user => {
    const [user_id] = await db('users').insert(user)
    return getUserById(user_id) 
}

const updateById = (user_id, user) => {
    //
}

const deleteById = user_id => {
    return db('users').where('user_id', user_id).del()
}

module.exports = {get, getUserById, addUser, updateById, deleteById}