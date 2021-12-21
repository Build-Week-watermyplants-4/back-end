
const db = require('../../data/db-config')


function get() {
    return db('users')
}

function getUserById(user_id) {
    return db('users').where('user_id', user_id).first()
}

function addUser({username, password}) {
    return db('users')
}

module.exports = {get, getUserById, addUser}