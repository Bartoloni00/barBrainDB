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

    static async create({data})
    {
        const newIngredient = {
            name: data.name,
            category: data.category
        }
        try {
            const ingredient = await ingredientDB.insertOne(newIngredient)
            newIngredient._id = ingredient.insertedId
            return newIngredient
        } catch (error) {
            throw new Error(`El ingrediente no pudo ser agregado: ${error}`)
        }
    }

    static async delete({id})
    {
        try {
            await ingredientDB.deleteOne({_id: new ObjectId(id)})
            // este return no se muestra porque el status es 204(no content)
            return {'message': `El ingrediente con el id: ${id} fue eliminado exitosamente.`}
        } catch (error) {
            throw new Error(`El ingrediente no pudo ser eliminado: ${error}`)
        }
    }

    static async update({id,data})
    {
        try {
            await ingredientDB.updateOne({_id: new ObjectId(id)}, {$set: data})
            return {"message": `Èl ingrediente con el id: ${id} fue actualizado correctamente.`, "newData": data}
        } catch (error) {
            throw new Error(`El ingrediente no pudo ser actualizado: ${error}`)
        }
    }
}