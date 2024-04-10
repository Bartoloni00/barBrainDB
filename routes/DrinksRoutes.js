import express from "express"
import DrinksController from '../controllers/DrinksController.js'
import CategoriesRoutes from "./CategoriesRoutes.js"
import IngredientsRoutes from "./ingredientsRoutes.js"
import drinksMiddleware from "../middlewares/drinksMiddleware.js"

import multer from 'multer'
import ImageMiddleware from "../middlewares/imageMiddleware.js"

// Este codigo servia para hacer el guardado de imagenes en el disco en lugar de en memoria como se hace actualmente.
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) 
//     {
//         cb(null, 'uploads/drinks')
//     },
//     filename: function (req, file, cb)
//     {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix) // Concatenar la extensión al nombre del archivo
//     }
// })

const storage = multer.memoryStorage()

const upload = multer({storage})

const DrinksRoutes = express.Router()

DrinksRoutes.get('/drinks/',DrinksController.getAll)
DrinksRoutes.get('/drinks/:id',DrinksController.getById)
DrinksRoutes.post('/drinks/',[
    upload.single('cover'),
    ImageMiddleware.resizeDrinkImage,
    drinksMiddleware.create,
],DrinksController.create)
DrinksRoutes.delete('/drinks/:id',DrinksController.delete)
DrinksRoutes.patch('/drinks/:id',[drinksMiddleware.update],DrinksController.update)

DrinksRoutes.use(CategoriesRoutes)
DrinksRoutes.use(IngredientsRoutes)
export default DrinksRoutes