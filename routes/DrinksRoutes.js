import express from "express"
import DrinksController from '../controllers/DrinksController.js'
import CategoriesRoutes from "./CategoriesRoutes.js"
import IngredientsRoutes from "./ingredientsRoutes.js"

const DrinksRoutes = express.Router()

DrinksRoutes.get('/drinks/',DrinksController.getAll)
DrinksRoutes.get('/drinks/:id',DrinksController.getById)

// TODO: realizar los create, delete y patch

DrinksRoutes.use(CategoriesRoutes)
DrinksRoutes.use(IngredientsRoutes)
export default DrinksRoutes