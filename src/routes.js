const express = require('express')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/users', UserController.index)
routes.get('/users/user', UserController.user)
routes.post('/users', UserController.store)
routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)

module.exports = routes