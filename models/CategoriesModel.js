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

    static async create({data})
    {
        const newCategory = {
        name: data.name,
        description: data.description
        }

        try {
            const category =  await categoriesDB.insertOne(newCategory)
            newCategory._id = category.insertedId
            return newCategory
        } catch (error) {
            throw Error(`La categoria no pudo ser agregada: ${error}`)
        }
    }

    static async delete({id})
    {
        try {
            await categoriesDB.deleteOne({_id: new ObjectId(id)})
            // este return no se muestra porque el status es 204(no content)
            return {'message': `La categoria con el id: ${id} fue eliminada exitosamente.`}
        } catch (error) {
            throw new Error(`La categoria no pudo ser eliminada: ${error}`)
        }
    }

    static async update({id, data})
    {
        try {
            await categoriesDB.updateOne({_id: new ObjectId(id)},{$set: data})
            return {"message": `La categoria con el id: ${id} fue actualizada correctamente.`, "newData": data}
        } catch (error) {
            throw new Error(`La categoria no pudo ser actualizada: ${error}`)
        }
    }
}