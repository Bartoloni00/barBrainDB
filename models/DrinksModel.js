import { MongoClient, ObjectId } from "mongodb"
import {deleteFile} from '../services/fs.js'

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)
const drinksDB = db.collection(process.env.DRINKS_COLLECTION_DB)

export default class DrinksModel
{
    static async getAll(filters)
    {
        let activeFilters = DrinksModel.#prepareFilters(filters)
        return drinksDB.find(activeFilters).toArray()
    }
    
    static async getById({id})
    {
        try {
            return drinksDB.findOne({_id: new ObjectId(id)})
       } catch (error) {
            throw new Error(`No logramos encontrar el trago con el id: ${id}`)
       }
    }

    static async create({data})
    {
        const newDrink = {
            ...data
        }

        try {
            const drink = await drinksDB.insertOne(newDrink)
            newDrink._id = drink.insertedId
            return newDrink
        } catch (error) {
            throw Error(`El trago no pudo ser agregado: ${error}`)
        }
    }

    static async delete({id})
    {
        try {
            const drinkDeleted = await drinksDB.findOne({_id: new ObjectId(id)})

            await drinksDB.deleteOne({_id: new ObjectId(id)})

            if (drinkDeleted.cover) await deleteFile(drinkDeleted.cover)
            // este return no se muestra porque el status es 204(no content)
            return {'message': `El trago con el id: ${id} fue eliminado exitosamente.`}
        } catch (error) {
            throw new Error(`El trago no pudo ser eliminado: ${error}`)
        }
    }

    static async update({id, data})
    {
        const drinkUpdated = await drinksDB.findOne({_id: new ObjectId(id)})

        try {
            if (drinkUpdated.cover && data.cover) await deleteFile(drinkUpdated.cover)

            await drinksDB.updateOne({_id: new ObjectId(id)},{$set: data})
            return {"message": `El trago con el id: ${id} fue actualizado correctamente.`, "newData": data}
        } catch (error) {
            throw new Error(`El trago no pudo ser actualizado: ${error}`)
        }
    }

    static #prepareFilters(filters)
    {
        let activeFilters = {}
        if (!filters) return {}
        if (filters.name) 
        {
            activeFilters.$text = { $search: filters.name }
        }
        if(filters.category)
        {
            activeFilters.category = filters.category
        }
        if(filters.ingredient)
        {
            activeFilters["ingredients.name"] = filters.ingredient
        }
        console.log(activeFilters);
        return activeFilters
    }
}