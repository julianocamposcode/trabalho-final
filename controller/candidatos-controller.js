import Candidato from "../model/candidatos.js";

export default class CandidatoController {
    gravar(req, res) {
        if (req.method === 'POST' && req.is('application/json')) {
            const dados = req.body;
            const cpf = dados.cpf;
            const tituloEleitoral = dados.tituloEleitoral;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            const rendaMensal = dados.rendaMensal;
            const filiacao = dados.filiacao;
            if (cpf && tituloEleitoral && nome && endereco && numero && bairro && cidade && uf && cep && rendaMensal && filiacao) {
                const candidato = new Candidato(null, cpf, tituloEleitoral, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, filiacao);
                candidato.gravar()
                    .then(() => {
                        res.status(201).json({
                            "status": true,
                            "mensagem": "Candidato cadastrado com sucesso"
                        });
                    }).catch((erro) => {
                        if (erro.code === 'ER_DUP_ENTRY') {
                            res.status(400).json({
                                "status": 500,
                                "mensagem": " Já existe um candidato cadastrado com esse cpf, por favor insira um cpf diferente."
                            });
                            return;
                        } else if (erro.code === 'ER_NO_REFERENCED_ROW_2') {
                            res.status(400).json({
                                "status": 510,
                                "mensagem": "O partido do candidato não se encontra na base de dados. Por favor insira um partido cadastrado"
                            });
                            return;
                        }
                        res.status(500).json({
                            "status": 500,
                            "mensagem": "Erro ao gravar candidado: " + erro
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
            const cpf = dados.cpf;
            const tituloEleitoral = dados.tituloEleitoral;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const numero = dados.numero;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const cep = dados.cep;
            const rendaMensal = dados.rendaMensal;
            const filiacao = dados.filiacao;
            if (id && cpf && tituloEleitoral && nome && endereco && numero && bairro && cidade && uf && cep && rendaMensal && filiacao) {
                const candidato = new Candidato(id, cpf, tituloEleitoral, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, filiacao);
                candidato.alterar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Candidato editado com sucesso"
                        });
                    })
                    .catch((erro) => {
                        if (erro.code === 'ER_NO_REFERENCED_ROW_2') {
                            res.status(400).json({
                                "status": 500,
                                "mensagem": "O partido do candidato não se encontra na base de dados. Por favor insira um partido cadastrado"
                            });
                            return;
                        }
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
            const id = dados.id;
            if (id) {
                const candidato = new Candidato(id);
                candidato.excluir()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Candidato excluído com sucesso"
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
            const candidato = new Candidato();
            candidato.consultar().then((listaCandidato) => {
                res.status(200).json({
                    "status": true,
                    "candidatos": listaCandidato
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