
const router = require('express').Router()
const User = require('./users-model')


router.get('/', async (req, res, next) => {
    try {
        const users = await User.get()
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:user_id', async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.user_id)
        res.json(user)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the users router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router