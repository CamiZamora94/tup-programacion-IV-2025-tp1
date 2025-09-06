import express from "express"

const app = express()
app.use(express.json())

let resultados = []

//primer endpoint
app.get("/", (req, res) => {
    res.status(200).send("Hola mundo")
})

app.post("/calcular", (req, res) => {
    const { base, altura } = req.body

    const perimetro = (base + altura) * 2
    const superficie= base * altura
    
    resultados.push({
        base,
        altura,
        perimetro,
        superficie
    })

    res.send("Calculo guardado")
})

app.get("/consultar", (req, res) => {
const datos = resultados.map((r) => {
    const tipo = r.base === r.altura ? "cuadrado" : "rectangulo";
    return { ...r, tipo };
});
res.json(datos);
});



const port= 3000
app.listen(port,() => {
    console.log("Servidor levantado")
})


