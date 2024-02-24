import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const categoriesDB = db.collection(process.env.CATEGORIES_COLLECTION_DB)

export default class CategoriesModel
{
    static async getAll()
    {
        return categoriesDB.find().toArray()
    }

    static async getById({id})
    {
        try {
            return categoriesDB.findOne({_id: new ObjectId(id)})
       } catch (error) {
            throw new Error(`we can't found the categorie with id: ${id}`)
       }
    }
}