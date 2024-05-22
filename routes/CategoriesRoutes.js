import express from 'express'
import CategoriesController from '../controllers/CategoriesController.js'
import categoriesMiddleware from '../middlewares/categorieMiddleware.js'
import TokenMiddleware from '../middlewares/tokenMiddleware.js'

const CategoriesRoutes = express.Router()

CategoriesRoutes.get('/categories/', CategoriesController.getAll)
CategoriesRoutes.get('/categories/:id', CategoriesController.getById)

CategoriesRoutes.post('/categories/',[
    TokenMiddleware.validate,
    categoriesMiddleware.create,
], CategoriesController.create)

CategoriesRoutes.delete('/categories/:id',[TokenMiddleware.validate], CategoriesController.delete)

CategoriesRoutes.patch('/categories/:id',[
    TokenMiddleware.validate,
    categoriesMiddleware.update
], CategoriesController.update)

export default CategoriesRoutes