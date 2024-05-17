import { ingredientsSchemaCreate, ingredientsSchemaUpdate } from "../schemas/IngredientsSchema.js"

export default class IngredientsMiddleware
{
    static async create(req, res, next)
    {
        ingredientsSchemaCreate.validate(req.body,{ abortEarly: false })
            .then( ingredient => {
                req.body = ingredient
                next()
            } )
            .catch(error => res.status(500).json(error.errors))
    }

    static async update(req, res, next)
    {
        ingredientsSchemaUpdate.validate(req.body,{ abortEarly: false, stripUnknown: true })
            .then( ingredient => {
                req.body = ingredient
                next()
            })
            .catch(error => res.status(500).json(error.errors))
    }
}