import express from "express"
import ProductManager from "./class/ProductManager.js"

const app = express()
const manager = new ProductManager("./src/DB/DB.json")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {
    const limit = parseInt(req.query.limit)
    const data = await manager.getProducts()
    if (limit) {
        const productsFilter = []
        for (let i = 0; i <= (limit - 1); i++) {
            console.log(i);
            productsFilter.push(data[i])
            console.log(productsFilter);
        }
        return res.send(productsFilter)
    } else return res.send(data)
})
app.get("/products/:id", async (req, res) => {
    const idProduct = parseInt(req.params.id)
    const searchProduct = await manager.getProductById(idProduct)
    if (searchProduct) res.send(searchProduct[0])
    else res.send(`No se encontro ningun producto con el id: ${idProduct}`)
})

app.listen(8010, () => console.log("Running server..."))