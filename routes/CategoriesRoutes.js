import express from 'express'
import CategoriesController from '../controllers/CategoriesController.js'

const CategoriesRoutes = express.Router()

CategoriesRoutes.get('/categories/', CategoriesController.getAll)
CategoriesRoutes.get('/categories/:id', CategoriesController.getById)

export default CategoriesRoutes