import PartidosDB from "../database/partidosDB.js";

export default class Partido {
    #codigo
    #nome
    #sigla

    constructor(codigo, nome, sigla) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#sigla = sigla;
    }

    get codigo() {
        return this.#codigo;
    }
    set codigo(codigo) {
        this.#codigo = codigo;
    }
    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        this.#nome = nome;
    }
    get sigla() {
        return this.#sigla;
    }
    set sigla(sigla) {
        this.#sigla = sigla;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "sigla": this.#sigla
        };
    }

    async gravar() {
        const partDB = new PartidosDB();
        await partDB.gravar(this);
    }
    async alterar() {
        const partDB = new PartidosDB();
        await partDB.alterar(this);
    }
    async excluir() {
        const partDB = new PartidosDB();
        await partDB.excluir(this);
    }
    async consultar() {
        const partDB = new PartidosDB();
        return await partDB.consultar(this);
    }
    // async consultarPorId() {
    //     const partDB = new PartidosDB();
    //     return await partDB.consultarPorId(this);
    // }
}