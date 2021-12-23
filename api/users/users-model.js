
const db = require('../../data/db-config')


function get() {
    return db('users')
}

function getUserById(user_id) {
    return db('users').where('user_id', user_id).first()
}

const addUser = async user => {
    const [createUser] = await db('users')
    .returning(['user_id', 'user_name', 'user_password', 'user_tel'])
    .insert(user)
    return createUser
}

const updateById = async (user_id, user) => {
    await db('users').where('user_id', user_id).update(user)
    return getUserById(user_id)
}

const deleteById = user_id => {
    return db('users').where('user_id', user_id).del()
}

module.exports = {get, getUserById, addUser, updateById, deleteById}