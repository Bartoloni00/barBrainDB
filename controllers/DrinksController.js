import { APIerrors } from '../errors.js'
import drinksMiddleware from '../middlewares/drinksMiddleware.js'
import DrinksModel from '../models/DrinksModel.js'

export default class DrinksController
{
    static async getAll(req, res)
    {
        let filters = req.query

        const drinks = await DrinksModel.getAll(filters)
        if(!drinks) res.status(404).json(APIerrors.NOT_FOUND)
        res.json(drinks)
    }

    static async getById(req, res)
    {
        const drinkId = req.params.id
        DrinksModel.getById({id: drinkId})
            .then(drink => { 
                if(!drink) res.status(404).json(APIerrors.NOT_FOUND)
                res.status(200).send(drink)
            })
            .catch(err => res.status(404).json({Error: err.message}))
    }
    
    static async create(req, res)
    {
        let newDrink = DrinksController.#prepareRequestData(req)
        DrinksModel.create({data: newDrink})
            .then(drink => res.status(200).send(drink))
            .catch(err => res.status(500).json({Error: err.message}))
    }

    static async delete(req, res)
    {
        const id = req.params.id
        DrinksModel.delete({id:id})
            .then(drink => res.status(204).send(drink))
            .catch(err=> res.status(500).json({Error: err.message}))
    }
    
    static async update(req, res)
    {
        const id = req.params.id
        const updatedDrink = DrinksController.#prepareRequestData(req)
        DrinksModel.update({id: id, data: updatedDrink})
            .then(drink => res.status(202).send(drink))
            .catch(err => res.status(500).json({Error: err.message}))
    }

    static async getRandom(req, res)
    {
        const drinkRandom = await DrinksModel.getRandom()
        if(!drinkRandom) res.status(400).json(APIerrors.NOT_FOUND)
        res.status(200).send(drinkRandom)
    }

    static async paginate(req, res)
    {
        DrinksModel.paginate(req.query)
        .then(paginateDrinks => res.status(200).send(paginateDrinks))
        .catch(err => res.status(400).send(err.message))
        
    }

    static #prepareRequestData(req)
    {
        let data
        if(req.file)
        {
            data = {
                ...req.body,
                cover: req.file.path
            }
        } else {
            data = {
                ...req.body,
            }
        }
        return data
    }
}