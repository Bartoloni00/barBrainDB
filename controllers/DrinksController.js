import DrinksModel from '../models/DrinksModel.js'

export default class DrinksController
{
    static async getAll(req, res)
    {
        const drinks = await DrinksModel.getAll()
        if(drinks) return res.json(drinks)
        res.status(404).json({Error: 'Drinks not found'})
    }
    static async getById(req, res)
    {
        const drinkId = req.params.id
        DrinksModel.getById({id: drinkId})
            .then(drink => res.status(200).send(drink))
            .catch(err => res.status(404).json({Error: err.message}))
    }
}