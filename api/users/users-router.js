
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
    try {
        const user = await User.getUserById(req.params.user_id)
        res.json(user)
    } catch (err) {
        next(err)
    }
})

router.post('/', md.checkUserPayload, md.checkUserUnique, async (req, res, next) => {
    try {
        const newUser = await User.addUser(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
})

router.put('/:user_id', md.checkUserId, md.checkUserPayload, md.checkUserUnique, async (req, res, next) => {
    try {
        const updated = await User.updateById(req.params.user_id, req.body)
        res.json(updated)
    } catch (err) {
        next(err)
    }
})

router.delete('/:user_id', md.checkUserId, async (req, res, next) => {
    try {
        await User.deleteById(req.params.user_id)
        res.json(req.user)
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