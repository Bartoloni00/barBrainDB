import CategoriesModel from '../models/CategoriesModel.js'
import Result from '../services/resultsPattern.js'

export default class CategoriesController 
{
    static async getAll(req, res)
    {
        CategoriesModel.getAll()
            .then(categories => res.status(200).json(Result.success(categories)))
            .catch(err => res.status(404).json(Result.failure(err.message)))
    }

    static async getById(req, res)
    {
        const categoryID = req.params.id

        CategoriesModel.getById({id:categoryID})
            .then(category => {
                res.status(200).json(Result.success(category))
            })
            .catch(err => {
                res.status(404).json(Result.failure(err.message))
            })
    }

    static async create(req, res)
    {
        CategoriesModel.create({data: req.body})
            .then(category => res.status(200).json(Result.success(category)))
            .catch(err => res.status(500).json(Result.failure(err.message)))
    }

    static async delete(req, res)
    {
        const id = req.params.id
        CategoriesModel.delete({id:id})
            .then(() => res.sendStatus(204))
            .catch(err => res.status(404).json(Result.failure(err.message)))
    }

    static async update(req, res)
    {
        const id = req.params.id
        const updatedCategory = req.body

        CategoriesModel.update({id: id, data: updatedCategory})
            .then(category => res.status(202).json(Result.success(category)))
            .catch(err => res.status(500).json(Result.failure(err.message)))
    }
}