import CandidatoDB from "../database/candidatoDB.js"

export default class Candidato {
    #id
    #cpf
    #tituloEleitoral
    #nome
    #endereco
    #numero
    #bairro
    #cidade
    #uf
    #cep
    #rendaMensal
    #filiacao

    constructor(id,cpf, tituloEleitoral, nome, endereco, numero, bairro, cidade, uf, cep, rendaMensal, filiacao) {
        this.#id = id;
        this.#cpf = cpf;
        this.#tituloEleitoral = tituloEleitoral;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#numero = numero;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#cep = cep;
        this.#rendaMensal = rendaMensal;
        this.#filiacao = filiacao;
    }

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }
    get cpf() {
        return this.#cpf;
    }
    set cpf(cpf) {
        this.#cpf = cpf;
    }
    get tituloEleitoral() {
        return this.#tituloEleitoral;
    }
    set tituloEleitoral(tituloEleitoral) {
        this.#tituloEleitoral = tituloEleitoral;
    }
    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        this.#nome = nome;
    }
    get endereco() {
        return this.#endereco;
    }
    set endereco(endereco) {
        this.#endereco = endereco;
    }
    get numero() {
        return this.#numero;
    }
    set numero(numero) {
        this.#numero = numero;
    }
    get bairro() {
        return this.#bairro;
    }
    set bairro(bairro) {
        this.#bairro = bairro;
    }
    get cidade() {
        return this.#cidade;
    }
    set cidade(cidade) {
        this.#cidade = cidade;
    }
    get uf() {
        return this.#uf;
    }
    set uf(uf) {
        this.#uf = uf;
    }
    get cep() {
        return this.#cep;
    }
    set cep(cep) {
        this.#cep = cep;
    }
    get rendaMensal() {
        return this.#rendaMensal;
    }
    set rendaMensal(rendaMensal) {
        this.#rendaMensal = rendaMensal;
    }
    get filiacao() {
        return this.#filiacao;
    }
    set filiacao(filiacao) {
        this.#filiacao = filiacao;
    }

    toJSON() {
        return {
            "id": this.#id,
            "cpf": this.#cpf,
            "tituloEleitoral": this.#tituloEleitoral,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "numero": this.#numero,
            "bairro": this.#bairro,
            "cidade": this.#cidade,
            "uf": this.#uf,
            "cep": this.#cep,
            "rendaMensal": this.#rendaMensal,
            "filiacao": this.#filiacao
        };
    }

    async gravar() {
        const candidatoDB = new CandidatoDB();
        await candidatoDB.gravar(this);
    }
    async alterar() {
        const candidatoDB = new CandidatoDB();
        await candidatoDB.alterar(this);
    }
    async excluir() {
        const candidatoDB = new CandidatoDB();
        await candidatoDB.excluir(this);
    }
    async consultar() {
        const candidatoDB = new CandidatoDB();
        return await candidatoDB.consultar(this);
    }
}