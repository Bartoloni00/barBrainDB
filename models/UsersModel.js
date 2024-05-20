import { MongoClient } from "mongodb"
import { APIerrors } from "../errors.js"
import bcrypt from "bcrypt"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const userDB = db.collection(process.env.USERS_COLLECTION_DB)

export default class UsersModel
{
    static async register({email, password})
    {
        const newUser = {email, password: await UsersModel.#hashPassword(password)}
       
        if ( await UsersModel.checkUserExists(newUser.email) ) {
            throw new Error(APIerrors.DUPLICATE_ENTRY_ERROR.title)
        }
        try {
            const user = await userDB.insertOne(newUser)
            newUser._id = user.insertedId
            return newUser
        } catch (error) {
            throw new Error(APIerrors.CREATE_FAILED.title)
        }
    }

    static async #hashPassword(password)
    {
        const hash = await bcrypt.hash(password, 10)

        if (hash) return hash
        throw new Error(APIerrors.HASH_ERROR.title)
    }

    static async checkUserExists(email)
    {
        const check = await userDB.findOne({email: email})

        if(check) return check
        return false
    }
}