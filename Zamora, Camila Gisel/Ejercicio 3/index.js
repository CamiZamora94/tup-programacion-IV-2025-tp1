import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let tareas = [];


app.get("/tareas", (req, res) => {
    const { completada } = req.query;

    if (completada !== undefined) {
        const filtro = tareas.filter(t => t.completada === (completada === "true"));
        return res.json(filtro);
    }

    res.json(tareas);
});


app.post("/tareas", (req, res) => {
    const { nombre, completada } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El nombre de la tarea es obligatorio" });
    }

    const existe = tareas.some(t => t.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
        return res.status(400).json({ error: "Ya existe una tarea con ese nombre" });
    }

    const nuevaTarea = {
        nombre,
        completada: completada || false
    };

    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});


app.put("/tareas/:nombre", (req, res) => {
    const { nombre } = req.params;
    const { completada } = req.body;

    const tarea = tareas.find(t => t.nombre.toLowerCase() === nombre.toLowerCase());

    if (!tarea) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }

    tarea.completada = completada;
    res.json(tarea);
});


app.delete("/tareas/:nombre", (req, res) => {
    const { nombre } = req.params;
    const index = tareas.findIndex(t => t.nombre.toLowerCase() === nombre.toLowerCase());

    if (index === -1) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const eliminada = tareas.splice(index, 1);
    res.json(eliminada[0]);
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
