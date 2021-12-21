
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const usersRouter = require('./users/users-router')
const plantsRouter = require('./plants/plants-router')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', usersRouter)
server.use('/api/plants', plantsRouter)

server.use('*', (req, res) => {
    res.json({api: 'up'})
})

module.exports = server