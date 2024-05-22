import { categorySchemaCreate, categorySchemaUpdate } from "../schemas/CategoriesSchema.js"
import Result from "../services/resultsPattern.js"

export default class categoriesMiddleware
{
    static async create(req, res, next)
    {
        categorySchemaCreate.validate(req.body,{ abortEarly: false })
            .then( category => {
                req.body = category
                next()
            } )
            .catch(error => res.status(422).json(Result.failure(error.errors)))
    }

    static async update(req, res, next)
    {
        categorySchemaUpdate.validate(req.body,{ abortEarly: false, stripUnknown: true })
            .then( category => {
                req.body = category
                next()
            })
            .catch(error => res.status(422).json(Result.failure(error.errors)))
    }
}