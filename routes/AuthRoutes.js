import express from 'express'
import AuthController from '../controllers/AuthController.js'

const AuthRoutes = express.Router()

AuthRoutes.post('/login',[],AuthController.login)
AuthRoutes.post('/logoout',[],AuthController.logout)

export default AuthRoutes