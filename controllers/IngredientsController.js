import IngredientsModel from '../models/IngredientsModel.js'
import Result from '../services/resultsPattern.js'

export default class IngredientsController
{
    static async getAll(req, res)
    {
        IngredientsModel.getAll()
        .then(ingredients => res.status(200).json(Result.success(ingredients)))
        .catch(err => res.status(404).json(Result.failure(err.message)))
    }

    static async getById(req,res)
    {
        const ingredientsID = req.params.id
        IngredientsModel.getById({id: ingredientsID})
            .then(ingredient => res.status(200).send(Result.success(ingredient)))
            .catch(err => res.status(404).json(Result.failure(err.message)))
    }

    static async create(req, res)
    {
        IngredientsModel.create({data: req.body})
            .then(ingredient => res.status(201).send(Result.success(ingredient)))
            .catch(err => res.status(400).json(Result.failure(err.message)))
    }

    static async delete(req, res)
    {
        const id = req.params.id
        IngredientsModel.delete({id:id})
            .then(() => res.sendStatus(204))
            .catch(err => res.status(404).json(Result.failure(err.message)))
    }

    static async update(req, res)
    {
        const id = req.params.id
        const updatedIngredient = req.body

        IngredientsModel.update({id: id,data: updatedIngredient})
            .then(ingredient => res.status(202).send(Result.success(ingredient)))
            .catch(err => res.status(400).json(Result.failure(err.message)))
    }
}