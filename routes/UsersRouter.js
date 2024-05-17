import express from 'express'
import AuthRoutes from './AuthRoutes.js'
import UsersMiddleware from '../middlewares/usersMiddleware.js'
import UsersController from '../controllers/UsersController.js'

const UsersRoutes = express.Router()

UsersRoutes.post('/users/create',[UsersMiddleware.create],UsersController.create)


UsersRoutes.use(AuthRoutes)
export default UsersRoutes