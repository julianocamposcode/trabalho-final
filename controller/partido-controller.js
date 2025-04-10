import Partido from "../model/partidos.js";

export default class PartidoController {
    gravar(req, res) {
        if (req.method === 'POST' && req.is('application/json')) {
            const dados = req.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const sigla = dados.sigla;
            if (codigo && nome && sigla) {
                const partido = new Partido(null, codigo, nome, sigla);
                partido.gravar()
                    .then(() => {
                        res.status(201).json({
                            "status": true,
                            "mensagem": "Partido cadastrado com sucesso"
                        });
                    })
                    .catch((erro) => {
                        if (erro.code === 'ER_DUP_ENTRY') {
                            res.status(400).json({
                                "status": 500,
                                "mensagem": " Já existe um partido cadastrado com esse código ou sigla, por favor insira um código / sigla diferente."
                            });
                            return;
                        }
                        res.status(500).json({
                            "status": 500,
                            "mensagem": "Erro ao gravar partido: " + erro
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
            const id = dados.id;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const sigla = dados.sigla;
            if (id && codigo && nome && sigla) {
                const partido = new Partido(id, codigo, nome, sigla);
                partido.alterar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Partido editado com sucesso"
                        });
                    })
                    .catch((erro) => {
                        if (erro.code === 'ER_DUP_ENTRY') {
                            res.status(400).json({
                                "status": 500,
                                "mensagem": " Já existe um partido cadastrado com esse código ou sigla, por favor insira um código / sigla diferente."
                            });
                            return;
                        }

                        res.status(500).json({
                            "status": 500,
                            "mensagem": "Erro ao alterar partido: " + erro
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
            const id = dados.id;
            if (id) {
                const partido = new Partido(id);
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
                            "mensagem": "Erro ao excluir partido: " + erro
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
                    "mensagem": "Erro ao consultar partidos: " + erro
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