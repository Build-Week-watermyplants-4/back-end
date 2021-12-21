const User = require('./users-model')

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
    const {user_name, user_password} = req.body
    if (user_name === undefined || user_password === undefined) {
        error.message = 'name and password are required'
        next(error)
    } else if (typeof user_name !== 'string') {
        error.message = 'name of account must be a string'
        next(error)
    }
}