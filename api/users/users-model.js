function getUserById(user_id) {
    return Promise.resolve(`awesome user with id ${user_id}`)
}

module.exports = {getUserById}