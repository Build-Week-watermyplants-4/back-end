
const router = require('express').Router()
const md = require('./users-middleware')
const User = require('./users-model')


router.get('/', async (req, res, next) => {
    try {
        const users = await User.get()
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:user_id', md.checkAccountId, async (req, res, next) => {
    res.json(req.user)
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the users router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router