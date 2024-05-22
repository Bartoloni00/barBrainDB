import { ingredientsSchemaCreate, ingredientsSchemaUpdate } from "../schemas/IngredientsSchema.js"
import Result from "../services/resultsPattern.js"

export default class IngredientsMiddleware
{
    static async create(req, res, next)
    {
        ingredientsSchemaCreate.validate(req.body,{ abortEarly: false })
            .then( ingredient => {
                req.body = ingredient
                next()
            } )
            .catch(error => res.status(422).json(Result.failure(error.errors)))
    }

    static async update(req, res, next)
    {
        ingredientsSchemaUpdate.validate(req.body,{ abortEarly: false, stripUnknown: true })
            .then( ingredient => {
                req.body = ingredient
                next()
            })
            .catch(error => res.status(422).json(Result.failure(error.errors)))
    }
}