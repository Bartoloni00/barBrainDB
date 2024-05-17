import { usersSchemaCreate , usersSchemaUpdate } from '../schemas/UsersSchema.js'

export default class UsersMiddleware
{
    static async create(req, res, next)
    {
        usersSchemaCreate.validate(req.body,{ abortEarly: false })
            .then( user => {
                req.body = user
                next()
            } )
            .catch(error => res.status(422).json(error.errors))
    }

    static async update(req, res, next)
    {
        usersSchemaUpdate.validate(req.body,{ abortEarly: false, stripUnknown: true })
            .then( user => {
                req.body = user
                next()
            })
            .catch(error => res.status(422).json(error.errors))
    }
}