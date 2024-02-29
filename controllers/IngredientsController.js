import IngredientsModel from '../models/IngredientsModel.js'

export default class IngredientsController
{
    static async getAll(req, res)
    {
        const ingredients = await IngredientsModel.getAll()
        if(ingredients) return res.status(200).json(ingredients)
        res.status(404).json({Error: 'Ingredients not found'})
    }

    static async getById(req,res)
    {
        const ingredientsID = req.params.id
        IngredientsModel.getById({id: ingredientsID})
            .then(ingredient => res.status(200).send(ingredient))
            .catch(err => res.status(404).json({Error: err.message}))
    }

    static async create(req, res)
    {
        IngredientsModel.create({data: req.body})
            .then(ingredient => res.status(201).send(ingredient))
            .catch(err => res.status(500).json({Error: err.message}))
    }

    static async delete(req, res)
    {
        const id = req.params.id
        IngredientsModel.delete({id:id})
            .then(ingredient => res.status(204).send(ingredient))
            .catch(err => res.status(500).json({Error: err.message}))
    }

    static async update(req, res)
    {
        const id = req.params.id
        const updatedIngredient = req.body

        IngredientsModel.update({id: id,data: updatedIngredient})
            .then(ingredient => res.status(202).send(ingredient))
            .catch(err => res.status(500).json({Error: err.message}))
    }
}