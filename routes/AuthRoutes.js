import express from 'express'
import AuthController from '../controllers/AuthController.js'
import UsersMiddleware from '../middlewares/usersMiddleware.js'
import TokenMiddleware from '../middlewares/tokenMiddleware.js'

const AuthRoutes = express.Router()

AuthRoutes.post('/login',[UsersMiddleware.partialValidate],AuthController.login)
AuthRoutes.delete('/logout',[TokenMiddleware.validate],AuthController.logout)

export default AuthRoutes