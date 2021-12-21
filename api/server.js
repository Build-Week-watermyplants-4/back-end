const express = require('express')
const usersRouter = require('./users/users-router')
const plantsRouter = require('./plants/plants.router')
const server = express()

server.use(express.json())

server.use('/api/users', usersRouter)
server.use('/api/plants', plantsRouter)

server.use('*', (req, res) => {
    res.json({api: 'up'})
})

module.exports = server