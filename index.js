import express from "express";
import autenticar from "./security/autenticar.js";
import session from "express-session";

const port = 3000;
const localhost = '0.0.0.0';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${port}`);
})

