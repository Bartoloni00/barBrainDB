import { drinksSchemaCreate, drinksSchemaUpdate } from "../schemas/DrinksSchema.js"

export default class drinksMiddleware 
{
    static async create(req, res, next)
    {
        drinksSchemaCreate.validate(req.body,{ abortEarly: false })
            .then( drink => {
                req.body = drink
                next()
            } )
            .catch(error => res.status(422).json(error))
    }

    static async update(req, res, next)
    {
        drinksSchemaUpdate.validate(req.body,{ abortEarly: false, stripUnknown: true })
            .then( drink => {
                req.body = drink
                next()
            })
            .catch(error => res.status(422).json(error))
    }
}