import express from 'express'
import IngredientsController from '../controllers/IngredientsController.js'
import IngredientsMiddleware from '../middlewares/ingredientsMiddleware.js'
import TokenMiddleware from '../middlewares/tokenMiddleware.js'

const IngredientsRoutes = express.Router()

IngredientsRoutes.get('/ingredients/', IngredientsController.getAll)
IngredientsRoutes.get('/ingredients/:id', IngredientsController.getById)

IngredientsRoutes.post('/ingredients/',[
    TokenMiddleware.validate,
    IngredientsMiddleware.create
], IngredientsController.create)

IngredientsRoutes.delete('/ingredients/:id',[TokenMiddleware.validate],IngredientsController.delete)

IngredientsRoutes.patch('/ingredients/:id',[
    TokenMiddleware.validate,
    IngredientsMiddleware.update
],IngredientsController.update)

export default IngredientsRoutes