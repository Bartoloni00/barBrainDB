import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const drinksDB = db.collection(process.env.DRINKS_COLLECTION_DB)

export default class DrinksModel
{
    static async getAll()
    {
        return drinksDB.find().toArray()
    }
    
    static async getById({id})
    {
        try {
            return drinksDB.findOne({_id: new ObjectId(id)})
       } catch (error) {
            throw new Error(`we can't found the drink with id: ${id}`)
       }
    }

    static async create({data})
    {
        const newDrink = {
            name: data.name,
            descripcion: data.descripcion,
            category: data.category,
            ingredients: [...data.ingredients]
          }

        try {
            const drink = await drinksDB.insertOne(newDrink)
            newDrink._id = drink.insertedId
            return newDrink
        } catch (error) {
            throw Error(`El trago no pudo ser agregado: ${error}`)
        }
    }
}