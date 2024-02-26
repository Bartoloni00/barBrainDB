import CategoriesModel from '../models/CategoriesModel.js'

export default class CategoriesController 
{
    static async getAll(req, res)
    {
        const categories = await CategoriesModel.getAll()
        if(categories) return res.json(categories)
        res.status(404).json({Error: 'Categories not found'})
    }

    static async getById(req, res)
    {
        const categorieID = req.params.id

        CategoriesModel.getById({id:categorieID})
            .then(categorie => {
                res.status(200).send(categorie)
            })
            .catch(err => {
                res.status(404).json({Error: err.message})
            })
    }

    static async create(req, res)
    {
        CategoriesModel.create({data: req.body})
            .then(category => res.status(200).send(category))
            .catch(err => res.status(500).json({Error: err.message}))
    }
}