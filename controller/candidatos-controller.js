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
            const partidoCodigo = dados.partidoCodigo;

            if (cpf && tituloEleitoral && nome && endereco && numero && bairro && cidade && uf && cep && rendaMensal && partidoCodigo) {
                const candidato = new Candidato(cpf, tituloEleitoral, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, partidoCodigo);
                candidato.gravar()
                    .then(() => {
                        res.status(201).json({
                            "status": true,
                            "mensagem": "Candidato cadastrado com sucesso"
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
            const partidoCodigo = dados.partidoCodigo;
            if (cpf && tituloEleitoral && nome && endereco && numero && bairro && cidade && uf && cep && rendaMensal && partidoCodigo) {
                const candidato = new Candidato(cpf, tituloEleitoral, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, partidoCodigo);
                candidato.alterar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Candidato alterado com sucesso"
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
            const cpf = dados.cpf;
            if (cpf) {
                const candidato = new Candidato(cpf);
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