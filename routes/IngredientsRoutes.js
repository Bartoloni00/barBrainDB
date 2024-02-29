import express from 'express'
import IngredientsController from '../controllers/IngredientsController.js'
import IngredientsMiddleware from '../middlewares/ingredientsMiddleware.js'

const IngredientsRoutes = express.Router()

IngredientsRoutes.get('/ingredients/', IngredientsController.getAll)
IngredientsRoutes.get('/ingredients/:id', IngredientsController.getById)
IngredientsRoutes.post('/ingredients/',IngredientsMiddleware.create, IngredientsController.create)
IngredientsRoutes.delete('/ingredients/:id',IngredientsController.delete)
IngredientsRoutes.patch('/ingredients/:id',[IngredientsMiddleware.update],IngredientsController.update)

export default IngredientsRoutes