import Partido from "../model/partidos.js";

export default class PartidoController {
    gravar(req, res) {
        if (req.method === 'POST' && req.is('application/json')) {
            const dados = req.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const sigla = dados.sigla;
            if (codigo && nome && sigla) {
                const partido = new Partido(codigo, nome, sigla);
                partido.gravar()
                    .then(() => {
                        res.status(201).json({
                            "status": true,
                            "mensagem": "Partido cadastrado com sucesso"
                        });
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": 500,
                            "mensagem": erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    "status": 400,
                    "mensagem": "Todos os campos são obrigatórios"
                })
            }
        } else {
            res.status(400).json({
                "status": 400,
                "mensagem": "Requisição inválida"
            })

        }
    }
    alterar(req, res) {
        if (req.method === 'PUT' || req.method === 'PATCH' && req.is('application/json')) {
            const dados = req.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const sigla = dados.sigla;
            if (codigo && nome && sigla) {
                const partido = new Partido(codigo, nome, sigla);
                partido.alterar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Partido alterado com sucesso"
                        });
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": 500,
                            "mensagem": erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    "status": 400,
                    "mensagem": "Todos os campos são obrigatórios"
                })
            }
        } else {
            res.status(400).json({
                "status": 400,
                "mensagem": "Requisição inválida"
            })
        }
    }
    excluir(req, res) {
        if (req.method === 'DELETE' && req.is('application/json')) {
            const dados = req.body;
            const codigo = dados.codigo;
            if (codigo) {
                const partido = new Partido(codigo);
                partido.excluir()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Partido excluído com sucesso"
                        });
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": 500,
                            "mensagem": erro.message
                        });
                    });
            } else {
                res.status(400).json({
                    "status": 400,
                    "mensagem": "Campo  obrigatório"
                })
            }
        } else {
            res.status(400).json({
                "status": 400,
                "mensagem": "Requisição inválida"
            })
        }
    }
    consultar(req, res) {
        if (req.method === 'GET') {
            const partido = new Partido();
            partido.consultar().then((listaPartido) => {
                res.status(200).json({
                    "status": true,
                    "partidos": listaPartido
                })
            }).catch((erro) => {
                res.status(500).json({
                    "status": 500,
                    "mensagem": erro.message
                });
            })
        } else {
            res.status(400).json({
                "status": 400,
                "mensagem": "Requisição inválida"
            })
        }
    }
}