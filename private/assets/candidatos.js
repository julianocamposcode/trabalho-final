// --------------integração------------
const form = document.getElementById("formCandidato")

const formGroups = form.querySelectorAll(".form-group");
formGroups.forEach(group => {
    const input = group.querySelector("input");
    const help = group.querySelector(".help-block");
    if (input) {
        input.addEventListener("input", () => {
            if (input.value) {
                group.classList.remove("has-error");
                group.classList.add("has-success");
                if (help) help.style.display = 'none';
            } else {
                group.classList.add("has-error");
                group.classList.remove("has-success");
                if (help) help.style.display = 'block';
            }
        })
    }
})

async function manipularEnvio(event) {
    event.preventDefault();
    event.stopPropagation();

    const formGroups = form.querySelectorAll(".form-group");
    let isValid = true;

    formGroups.forEach(group => {
        const input = group.querySelector("input");
        const help = group.querySelector(".help-block");

        if (input && !input.value) {
            group.classList.add("has-error");
            group.classList.remove("has-success");
            if (help) help.style.display = 'block';
            isValid = false;
        } else {
            group.classList.remove("has-error");
            group.classList.remove("has-success");
            if (help) help.style.display = 'none';
        }
    });

    const botao = document.getElementById('btn-salvar');
    if (botao.innerText == 'Cadastrar') {
        if (isValid) {
            botao.disabled = true;
            botao.innerHTML = `<i class="fa fa-spinner fa-spin"></i><span>Cadastrando</span>`;

            await adicionarCandidato()
            await mostrarTabelaCandidatos();

            botao.disabled = false;
            botao.innerHTML = `Cadastrar`;
        }
    } else if (botao.innerText == 'Editar') {
        botao.disabled = true;
        botao.innerHTML = `<i class="fa fa-spinner fa-spin"></i><span>Editando</span>`;

        bootbox.confirm("Você tem certeza que deseja editar este candidato?", function (result) {
            if (result) {
                atualizarCandidato().then(() => {
                    mostrarTabelaCandidatos().then(() => {
                        botao.disabled = false;
                        botao.innerHTML = `Cadastrar`;
                    });
                });
            } else {
                botao.disabled = false;
                botao.innerHTML = `Editar`;
            }
        });
        s
    }
}

form.addEventListener("submit", manipularEnvio)

async function mostrarSigla() {
    const resposta = await fetch("http://localhost:3000/partidos", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const dadosRecebidos = await resposta.json();


    if (dadosRecebidos.status == true) {
        dadosRecebidos.partidos.forEach(dado => {
            new PNotify({
                title: dado.sigla,
                text: dado.nome,
                type: "success",
                styling: "bootstrap3",
                delay: 3000,
                icon: 'none'
            });
        })
    }
    if (dadosRecebidos.partidos.length == 0) {
        new PNotify({
            text: 'Nenhum partido cadastrado',
            type: "success",
            styling: "bootstrap3",
            delay: 3000,
            icon: 'none'
        });
    }
}

function pegarDados() {
    const id = document.getElementById('id').value
    const cpf = document.getElementById('cpf').value
    const titulo = document.getElementById('titulo').value
    const nome = document.getElementById('nome').value
    const endereco = document.getElementById('endereco').value
    const numero = document.getElementById('numero').value
    const bairro = document.getElementById('bairro').value
    const cidade = document.getElementById('cidade').value
    const uf = document.getElementById('uf').value
    const cep = document.getElementById('cep').value
    const renda = document.getElementById('renda').value
    const filiacao = document.getElementById('filiacao').value.toUpperCase();

    return {
        "id": id,
        "cpf": cpf,
        "tituloEleitoral": titulo,
        "nome": nome,
        "endereco": endereco,
        "numero": numero,
        "bairro": bairro,
        "cidade": cidade,
        "uf": uf,
        "cep": cep,
        "rendaMensal": renda,
        "filiacao": filiacao
    }
}

async function adicionarCandidato() {
    const dadosCandidato = pegarDados();
    try {
        const resposta = await fetch("http://localhost:3000/candidatos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosCandidato)
        });

        const dadosRecebidos = await resposta.json();

        if (dadosRecebidos.status === true) {
            new PNotify({
                title: "Sucesso!",
                text: dadosRecebidos.mensagem,
                type: "success",
                styling: "bootstrap3",
                delay: 4000,

            });
            form.reset();
        } else {
            new PNotify({
                title: "Erro!",
                text: dadosRecebidos.mensagem,
                type: "error",
                styling: "bootstrap3",
                delay: 4000,
            });

        }
    } catch (erro) {
        new PNotify({
            title: "Erro!",
            text: "Erro ao adicionar Cadidato: " + erro.message,
            type: "error",
            styling: "bootstrap3",
            delay: 4000,
        });
    }
}

async function mostrarTabelaCandidatos() {
    try {
        const resposta = await fetch("http://localhost:3000/candidatos", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const dadosRecebidos = await resposta.json();

        const tabela = document.getElementById('tabela-candidatos');

        tabela.innerHTML = "";


        const candidatos = dadosRecebidos.candidatos;
        if (candidatos.length > 0) {
            candidatos.forEach(candidato => {
                const linha = document.createElement('tr');
                linha.id = candidato.id
                linha.classList.add('fade-in');
                linha.innerHTML = `
                    <td data-label='Cpf:'>${candidato.cpf}</td>
                    <td data-label='Titulo de Eleitor:'>${candidato.tituloEleitoral}</td>
                    <td data-label='Nome:'>${candidato.nome}</td>
                    <td data-label='Endereço:'>${candidato.endereco}</td>
                    <td data-label='Número:'>${candidato.numero}</td>
                    <td data-label='Bairro:'>${candidato.bairro}</td>
                    <td data-label='Cidade:'>${candidato.cidade}</td>
                    <td data-label='Uf:'>${candidato.uf}</td>
                    <td data-label='Cep:'>${candidato.cep}</td>
                    <td data-label='Renda Mensal:'>${candidato.rendaMensal}</td>
                    <td data-label='Partido:'>${candidato.filiacao}</td>
                    <td data-label='Ações:'>
                        <div>
                            <a href='#edicao'><button class="btn btn-info btn-xs" onclick="pegarCandidato(
                            '${candidato.id}',
                            '${candidato.cpf}',
                            '${candidato.tituloEleitoral}',
                            '${candidato.nome}',
                            '${candidato.endereco}',
                            '${candidato.numero}',
                            '${candidato.bairro}',
                            '${candidato.cidade}',
                            '${candidato.uf}',
                            '${candidato.cep}',
                            '${candidato.rendaMensal}',
                            '${candidato.filiacao}', 'atualizar')">Editar</button></a>
                            <button class="btn btn-danger btn-xs excluir" id='${candidato.id}' onclick="deletar('${candidato.id}')">Excluir</button>
                        </div>
                    </td>
                `;
                tabela.appendChild(linha);


                const urlParams = new URLSearchParams(window.location.search);
                const idNaURL = urlParams.get('id');
                // if (urlParams.has(candidato.id)) {
                if (idNaURL && candidato.id == idNaURL) {
                    document.getElementById(`${candidato.id}`).style.background = 'rgb(91 192 222 / 7%)'
                }

                setTimeout(() => {
                    const elemento = document.getElementById(idNaURL);
                    if (elemento) {
                        elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 500);

                // }
            });
        } else {
            const linha = document.createElement('tr');
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            function handleMediaQueryChange(e) {
                if (e.matches) {

                    linha.innerHTML = `
                    <td style='display:flex;justify-content: center; align-items:center'>Nenhum candidato cadastrado...</td>
                `;
                } else {
                    linha.innerHTML = `
                        <td colspan="12">Nenhum candidato cadastrado...</td>
                    `;
                }
            }

            mediaQuery.addEventListener('change', handleMediaQueryChange);

            handleMediaQueryChange(mediaQuery);

            tabela.appendChild(linha);
        }
    } catch (erro) {
        new PNotify({
            title: "Erro!",
            text: "Erro ao mostrar tabela de Candidatos: " + erro.message,
            type: "error",
            styling: "bootstrap3",
            delay: 4000,
        });
    }
}

mostrarTabelaCandidatos()

function pegarCandidato(
    id,
    cpf,
    tituloEleitoral,
    nome,
    endereco,
    numero,
    bairro,
    cidade,
    uf,
    cep,
    rendaMensal,
    filiacao, acao
) {
    document.getElementById('id').value = id;
    document.getElementById('cpf').value = cpf
    document.getElementById('titulo').value = tituloEleitoral;
    document.getElementById('nome').value = nome;
    document.getElementById('endereco').value = endereco;
    document.getElementById('numero').value = numero;
    document.getElementById('bairro').value = bairro;
    document.getElementById('cidade').value = cidade;
    document.getElementById('uf').value = uf;
    document.getElementById('cep').value = cep;
    document.getElementById('renda').value = rendaMensal;
    document.getElementById('filiacao').value = filiacao;

    if (acao == 'atualizar') {
        document.getElementById('btn-salvar').innerHTML = `Editar`;
    }
}

async function atualizarCandidato() {
    const dadosCandidato = pegarDados();
    try {
        const resposta = await fetch("http://localhost:3000/candidatos", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosCandidato)
        });

        const dadosRecebidos = await resposta.json();

        if (dadosRecebidos.status === true) {
            new PNotify({
                title: "Sucesso!",
                text: dadosRecebidos.mensagem,
                type: "success",
                styling: "bootstrap3",
                delay: 4000,

            });
            form.reset();
        } else {
            new PNotify({
                title: "Erro!",
                text: dadosRecebidos.mensagem,
                type: "error",
                styling: "bootstrap3",
                delay: 4000,
            });
        }
    } catch (erro) {
        new PNotify({
            title: "Erro!",
            text: "Erro ao adicionar Candidato: " + erro.message,
            type: "error",
            styling: "bootstrap3",
            delay: 4000,
        });
    }
}
async function excluirCandidato(id) {
    try {
        const resposta = await fetch("http://localhost:3000/candidatos", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        const dadosRecebidos = await resposta.json();

        if (dadosRecebidos.status === true) {
            new PNotify({
                title: "Sucesso!",
                text: dadosRecebidos.mensagem,
                type: "success",
                styling: "bootstrap3",
                delay: 4000,

            });
        } else {
            new PNotify({
                title: "Erro!",
                text: dadosRecebidos.mensagem,
                type: "error",
                styling: "bootstrap3",
                delay: 4000,
            });
        }
    } catch (erro) {
        new PNotify({
            title: "Erro!",
            text: "Erro ao adicionar Candidato: " + erro.message,
            type: "error",
            styling: "bootstrap3",
            delay: 4000,
        });
    }
}

function deletar(id) {
    let botaoExcluir = document.querySelectorAll('.excluir')

    botaoExcluir.forEach(botao => {
        if (botao.id == id) {
            botao.disabled = true;
            botao.innerHTML = `<i class="fa fa-spinner fa-spin" style='padding:0 .9rem'></i>`;
            bootbox.confirm("Você tem certeza que deseja excluir este candidato?", function (result) {
                if (result) {
                    excluirCandidato(id).then(() => {
                        mostrarTabelaCandidatos().then(() => {
                            botao.disabled = false;
                            botao.innerHTML = `Excluir`;
                        });
                    });
                } else {
                    botao.disabled = false;
                    botao.innerHTML = `Excluir`;
                }
            });
        }

    })
}


document.addEventListener("DOMContentLoaded", () => {
    // Aplica no <html> e <body>
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.scrollBehavior = "smooth";

    // Aplica em todos os elementos com overflow scroll ou auto
    const scrollables = document.querySelectorAll('*');
    scrollables.forEach(el => {
        const style = window.getComputedStyle(el);
        if (['auto', 'scroll'].includes(style.overflowY) || ['auto', 'scroll'].includes(style.overflow)) {
            el.style.scrollBehavior = "smooth";
        }
    });
});

const cpf = document.getElementById('cpf')
const titulo = document.getElementById('titulo')
const nome = document.getElementById('nome')
const endereco = document.getElementById('endereco')
const numero = document.getElementById('numero')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('uf')
const cep = document.getElementById('cep')
const renda = document.getElementById('renda')
const filiacao = document.getElementById('filiacao')

cpf.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, '').slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    this.value = valor;
});


titulo.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, '').slice(0, 12);
    valor = valor.replace(/(\d{4})(\d)/, '$1 $2');
    valor = valor.replace(/(\d{4}) (\d{4})(\d)/, '$1 $2 $3');
    this.value = valor;
});

uf.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2);
});

cep.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, '').slice(0, 8);
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    this.value = valor;
});



let navigation = document.querySelector('.nav_menu');

function scroll() {
    if (scrollY > 0) {
        navigation.classList.add('style_nav');
    } else {
        navigation.classList.remove('style_nav');
    }
}


