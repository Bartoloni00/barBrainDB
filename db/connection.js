import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.CONNECTION_DB)
const db = client.db(process.env.NAME_DB)

client.connect()
    .then(async () => {
        console.log('conectado');
    })
    .catch( err => console.log(`Error al intentar conectar a la Base de datos ${err}`))