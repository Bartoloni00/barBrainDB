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
}