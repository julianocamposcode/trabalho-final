import Partido from "../model/partidos.js";
import conectar from "./conexao.js";

export default class PartidosDB {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS partidos (
                id  INT  NOT NULL PRIMARY KEY AUTO_INCREMENT,
                codigo INT NOT NULL ,
                nome VARCHAR(255) NOT NULL,
                sigla VARCHAR(10) NOT NULL UNIQUE
            );`

            await conexao.execute(sql);
            conexao.release();
        } catch (erro) {
            console.log(erro);
        }
    }

    async gravar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `INSERT INTO partidos (codigo, nome, sigla) VALUES (?, ?, ?)`;
            const parametros = [
                partido.codigo,
                partido.nome,
                partido.sigla
            ]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }
    async alterar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `UPDATE partidos SET codigo = ?, nome = ?, sigla = ? WHERE id = ?`;
            const parametros = [
                partido.codigo,
                partido.nome,
                partido.sigla,
                partido.id
            ]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }
    async excluir(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `DELETE FROM partidos WHERE id = ?`;
            const parametros = [partido.id]
            await conexao.execute(sql, parametros);
            conexao.release();
        }
    }
    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM partidos ORDER BY nome`;
        const [linhas] = await conexao.execute(sql);
        conexao.release();
        return linhas.map(linha => new Partido(linha.id, linha.codigo, linha.nome, linha.sigla));
    }
}