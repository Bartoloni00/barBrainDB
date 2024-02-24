import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const ingredientDB = db.collection(process.env.INGREDIENTS_COLLECTION_DB)

export default class IngredientsModel
{
    static async getAll()
    {
        return ingredientDB.find().toArray()
    }
    
    static async getById({id})
    {
        try {
            return ingredientDB.findOne({_id: new ObjectId(id)})
       } catch (error) {
            throw new Error(`we can't found the ingredient with id: ${id}`)
       }
    }
}