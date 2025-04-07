import express from 'express';
import rotaPartido from './routes/rotaPartido.js';
import rotaCandidato from './routes/rotaCandidato.js';

const host = '0.0.0.0'
const porta = 4000
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/partidos', rotaPartido)
app.use('/candidatos', rotaCandidato)

app.listen(porta, host, () => {
    console.log(`Servidor backend rodando em http://${host}:${porta}`);
})