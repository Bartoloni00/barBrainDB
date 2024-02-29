import express from 'express'
import CategoriesController from '../controllers/CategoriesController.js'
import categoriesMiddleware from '../middlewares/categorieMiddleware.js'

const CategoriesRoutes = express.Router()

CategoriesRoutes.get('/categories/', CategoriesController.getAll)
CategoriesRoutes.get('/categories/:id', CategoriesController.getById)
CategoriesRoutes.post('/categories/',[categoriesMiddleware.create], CategoriesController.create)
CategoriesRoutes.delete('/categories/:id', CategoriesController.delete)
CategoriesRoutes.patch('/categories/:id',[categoriesMiddleware.update], CategoriesController.update)

export default CategoriesRoutes