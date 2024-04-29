import { APIerrors } from "../errors.js"
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

    static async paginate(req, res, next)
    {
        try {
            drinksMiddleware.#validateQueryIntegerParam(req.query.page, 'page')
            drinksMiddleware.#validateQueryIntegerParam(req.query.perPage, 'perPage')
            next()
        } catch (error) {
            res.status(422).json(error.message)
        }
    }

    static #validateQueryIntegerParam(bodyParam, paramName)
    {
        bodyParam = parseInt(bodyParam)
        if (!bodyParam || !Number.isInteger(bodyParam))
        {
        throw new Error(`${APIerrors.INCOMPLETE_ERROR.title} | ${paramName}`);
        }
    }
}