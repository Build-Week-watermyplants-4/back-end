
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

router.get('/:user_id', md.checkUserId, async (req, res, next) => {
    res.json(req.user)
})

router.post('/', md.checkUserPayload, md.checkUserUnique, async (req, res, next) => {
    try {
        const newUser = await User.addUser(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router