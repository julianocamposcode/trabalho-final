import express from "express";
import autenticar from "./security/autenticar.js";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
}));

// Rotas públicas
app.get('/login', (req, res) => {
  res.redirect('/login.html');
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/index.html');
});

app.post('/login', (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;

  if (usuario === 'admin' && senha === '1234') {
    req.session.autenticado = true;
    const destino = req.session.urlOriginal || '/';
    req.session.urlOriginal = null;
    res.redirect(destino);
  } else {
    res.redirect('/login.html?erro=1');
  }
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(autenticar, express.static(path.join(__dirname, 'private')));

// 🔁 Exporta app para a Vercel usar
export default app;
