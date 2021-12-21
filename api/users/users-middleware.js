const User = require('./users-model')

exports.checkAccountId = async (req, res, next) => {
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