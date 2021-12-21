
const User = require('./users-model')
const db = require('../../data/db-config')

exports.checkUserId = async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.user_id)
        if (!user) {
            next({status: 404, message: 'not found'})
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}

exports.checkUserPayload = (req, res, next) => {
    const error = {status: 400}
    const {user_name, user_password, user_tel} = req.body
    if (user_name === undefined || user_password === undefined || user_tel === undefined) {
        error.message = 'name and password are required'
        next(error)
    } else if (typeof user_name !== 'string') {
        error.message = 'name of account must be a string'
        next(error)
    } else if (user_name.trim().length < 3 || user_name.trim().length > 100) {
        error.message = 'name of account must be between 3 and 100'
        next(error)
    } else {
        next()
    }
}

exports.checkUserUnique = async (req, res, next) => {
    try {
        const exists = await db('users')
        .where('user_name', req.body.user_name.trim()).first()
        
        if (exists) {
            next({status: 400, message: 'that name is taken'})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}