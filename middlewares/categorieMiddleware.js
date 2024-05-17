import { categorySchemaCreate, categorySchemaUpdate } from "../schemas/CategoriesSchema.js"

export default class categoriesMiddleware
{
    static async create(req, res, next)
    {
        categorySchemaCreate.validate(req.body,{ abortEarly: false })
            .then( category => {
                req.body = category
                next()
            } )
            .catch(error => res.status(500).json(error.errors))
    }

    static async update(req, res, next)
    {
        categorySchemaUpdate.validate(req.body,{ abortEarly: false, stripUnknown: true })
            .then( category => {
                req.body = category
                next()
            })
            .catch(error => res.status(500).json(error.errors))
    }
}