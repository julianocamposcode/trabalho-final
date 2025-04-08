import express from 'express';
import rotaPartido from './routes/rotaPartido.js';
import rotaCandidato from './routes/rotaCandidato.js';
import autenticar from "./security/autenticar.js";
import session from "express-session";

const host = '0.0.0.0'
const porta = 3000
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/partidos', rotaPartido)
app.use('/candidatos', rotaCandidato)

app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))


app.get('/login', (req, res) => {
    res.redirect('/login.html');
})

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect('/index.html');
})

app.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === 'admin' && senha === '1234') {
        req.session.autenticado = true;
        const destino = req.session.urlOriginal || '/';
        req.session.urlOriginal = null; // limpa a variável
        res.redirect(destino);
    } else {
        res.redirect('/login.html?erro=1');
    }
})

app.use(express.static('./public'));
app.use(autenticar, express.static('./private'));



app.listen(porta, host, () => {
    console.log(`Servidor backend rodando em http://${host}:${porta}`);
})