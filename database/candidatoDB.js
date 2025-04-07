import Candidato from "../model/candidatos.js";
import conectar from "./conexao.js";

export default class CandidatoDB {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS candidato (
            cpf VARCHAR(14) NOT NULL PRIMARY KEY,
            tituloEleitoral VARCHAR(20) NOT NULL,
            nome VARCHAR(100) NOT NULL,
            endereco VARCHAR(100),
            numero INT,
            bairro VARCHAR(50),
            cidade VARCHAR(50),
            uf CHAR(2),
            cep VARCHAR(9),
            rendaMensal DECIMAL(10,2),
            partidoCodigo INT,
            FOREIGN KEY (partidoCodigo) REFERENCES partidos(codigo)  
        );`

            await conexao.execute(sql);
        } catch (erro) {
            console.log(erro);
        }
    }
    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `INSERT INTO candidato (cpf, tituloEleitoral, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, partidoCodigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                candidato.cpf,
                candidato.tituloEleitoral,
                candidato.nome,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.cidade,
                candidato.uf,
                candidato.cep,
                candidato.rendaMensal,
                candidato.partidoCodigo
            ]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }
    async alterar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `UPDATE candidato SET tituloEleitoral = ?, nome = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, uf = ?, cep = ?, rendaMensal = ?, partidoCodigo = ?  WHERE cpf = ?`;
            const parametros = [
                candidato.tituloEleitoral,
                candidato.nome,
                candidato.endereco,
                candidato.numero,
                candidato.bairro,
                candidato.cidade,
                candidato.uf,
                candidato.cep,
                candidato.rendaMensal,
                candidato.partidoCodigo,
                candidato.cpf
            ]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }
    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `DELETE FROM candidato WHERE cpf = ?`;
            const parametros = [candidato.cpf]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM candidato ORDER BY nome`;
        const [linhas] = await conexao.execute(sql);
        conexao.release();
        return linhas.map(linha => new Candidato(
            linha.cpf,
            linha.tituloEleitoral,
            linha.nome,
            linha.endereco,
            linha.numero,
            linha.bairro,
            linha.cidade,
            linha.uf,
            linha.cep,
            linha.rendaMensal,
            linha.partidoCodigo
        ));
    }

}