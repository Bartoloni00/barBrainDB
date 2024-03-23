import express from "express";
import cors from "cors"
import DrinksRoutes from "./routes/DrinksRoutes.js";

const app = new express()
const port = 9763

app.use(express.urlencoded({ extended : true }))
app.use('/',express.static('public'))
app.use(express.json()) // esto es estrictamente necesario para que nuestra api pueda recibir JSONs

app.use(cors())

app.use(DrinksRoutes)
app.use('/uploads',[],express.static('uploads'))

app.listen(port,() => {
    console.log(`App listening on port http://localhost:${port}`)
})