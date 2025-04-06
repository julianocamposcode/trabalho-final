import express from "express";

const port = 3000;
const localhost = '0.0.0.0';

const app = express();

app.use(express.static('./public'));
app.use(express.static('./private'));

app.listen(port, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${port}`);
})

