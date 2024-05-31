import express from 'express';
import jimp from 'jimp';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
    res.sendFile(join(__dirname + '/public/index.html'))
})

app.post("/imagen", async (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg')
    const uuid= uuidv4().slice(0, 6);
    const imagenPath = join(__dirname, 'public', 'storage', `${uuid}.jpeg`);
    const imagen = await jimp.read(req.body.image)
    await imagen
        .resize(350, jimp.AUTO)
        .greyscale()
        .writeAsync(imagenPath)
    const imagenData = fs.readFileSync(imagenPath)
    res.send(imagenData)
});

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000.")
}); 