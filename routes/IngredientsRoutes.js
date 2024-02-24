import express from 'express'
import IngredientsController from '../controllers/IngredientsController.js'

const IngredientsRoutes = express.Router()

IngredientsRoutes.get('/ingredients/', IngredientsController.getAll)
IngredientsRoutes.get('/ingredients/:id', IngredientsController.getById)

export default IngredientsRoutes