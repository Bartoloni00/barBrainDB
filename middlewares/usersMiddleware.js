import { usersSchemaCreate , usersSchemaUpdate } from '../schemas/UsersSchema.js'
import Result from '../services/resultsPattern.js'

export default class UsersMiddleware
{
    static async validate(req, res, next)
    {
        usersSchemaCreate.validate(req.body,{ abortEarly: false })
            .then( user => {
                req.body = user
                next()
            } )
            .catch(error => res.status(422).json(Result.failure(error.errors)))
    }

    static async partialValidate(req, res, next)
    {
        usersSchemaUpdate.validate(req.body,{ abortEarly: false, stripUnknown: true })
            .then( user => {
                req.body = user
                next()
            })
            .catch(error => res.status(422).json(Result.failure(error.errors)))
    }
}