import { APIerrors } from '../errors.js'
import DrinksModel from '../models/DrinksModel.js'
import Result from '../services/resultsPattern.js'

export default class DrinksController
{
    static async getAll(req, res)
    {
        let filters = req.query
        DrinksModel.getAll(filters)
            .then(drinks => res.status(200).json(Result.success(drinks)))
            .catch(err => res.status(404).json(Result.failure(err.message)))
    }

    static async getById(req, res)
    {
        const drinkId = req.params.id
        DrinksModel.getById({id: drinkId})
            .then(drink => res.status(200).json(Result.success(drink)))
            .catch(err => res.status(404).json(Result.failure(err.message)))
    }
    
    static async create(req, res)
    {
        let newDrink = DrinksController.#prepareRequestData(req)

        DrinksModel.create({data: newDrink})
            .then(drink => res.status(200).json(Result.success(drink)))
            .catch(err => res.status(400).json(Result.failure(err.message)))
    }

    static async delete(req, res)
    {
        const id = req.params.id
        DrinksModel.delete({id:id})
            .then(() => res.sendStatus(204))
            .catch(err=> res.status(404).json(Result.failure(err.message)))
    }
    
    static async update(req, res)
    {
        const id = req.params.id
        const updatedDrink = DrinksController.#prepareRequestData(req)
        DrinksModel.update({id: id, data: updatedDrink})
            .then(drink => res.status(202).json(Result.success(drink)))
            .catch(err => res.status(400).json(Result.failure(err.message)))
    }

    static async getRandom(req, res)
    {
        DrinksModel.getRandom()
            .then(drink => res.status(200).json(Result.success(drink)))
            .catch(err => res.status(404).json(Result.failure(err.message)))
    }

    static async paginate(req, res)
    {
        DrinksModel.paginate(req.query)
        .then(paginateDrinks => res.status(200).json(Result.success(paginateDrinks)))
        .catch(err => res.status(400).json(Result.failure(err.message)))
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