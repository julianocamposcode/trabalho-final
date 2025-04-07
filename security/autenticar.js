export default function autenticar(req, res, next) {
    if (req.session.autenticado === true) {
        next();
    } else {
        req.session.urlOriginal = req.originalUrl;
        res.redirect('/login');
    }
}