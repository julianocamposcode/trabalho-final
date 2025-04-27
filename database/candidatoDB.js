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
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            cpf VARCHAR(14) NOT NULL UNIQUE,
            tituloEleitoral VARCHAR(20) NOT NULL,
            nome VARCHAR(100) NOT NULL,
            endereco VARCHAR(100),
            numero INT,
            bairro VARCHAR(50),
            cidade VARCHAR(50),
            uf CHAR(2),
            cep VARCHAR(9),
            rendaMensal DECIMAL(10,2),
            filiacao VARCHAR(10) NOT NULL,
            FOREIGN KEY (filiacao) REFERENCES partidos(sigla)  
        )`
            await conexao.execute(sql);
            conexao.release();
        } catch (erro) {
            console.log(erro);
        }
    }
    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `INSERT INTO candidato (cpf, tituloEleitoral, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, filiacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
                candidato.filiacao
            ]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }
    async alterar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `UPDATE candidato SET cpf = ?, tituloEleitoral = ?, nome = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, uf = ?, cep = ?, rendaMensal = ?, filiacao = ? WHERE id = ?`;
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
                candidato.filiacao,
                candidato.id
            ]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }
    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `DELETE FROM candidato WHERE id = ?`;
            const parametros = [candidato.id]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM candidato`;
        const [linhas] = await conexao.execute(sql);
        conexao.release();  
        return linhas.map(linha => new Candidato(
            linha.id,
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
            linha.filiacao
        ));
    }
}