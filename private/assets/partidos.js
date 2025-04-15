const form = document.getElementById("form-partido")

const formGroups = form.querySelectorAll(".form-group");
formGroups.forEach(group => {
    const input = group.querySelector("input");
    const help = group.querySelector(".help-block");

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

            await adicionarPartido();
            await mostrarTabelaPartidos();

            botao.disabled = false;
            botao.innerHTML = `Cadastrar`;
        }
    } else if (botao.innerText == 'Editar') {
        botao.disabled = true;
        botao.innerHTML = `<i class="fa fa-spinner fa-spin"></i><span>Editando</span>`;

        bootbox.confirm("Você tem certeza que deseja editar este partido?", function (result) {
            if (result) {
                atualizarPartido().then(() => {
                    mostrarTabelaPartidos().then(() => {
                        botao.disabled = false;
                        botao.innerHTML = `Cadastrar`;
                    });
                })
            } else {
                botao.disabled = false;
                botao.innerHTML = `Cadastrar`;
            }
        });
    }
}

form.addEventListener("submit", manipularEnvio)


function pegarDados() {
    const id = document.getElementById('id').value;
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const sigla = document.getElementById('sigla').value.toUpperCase();

    return {
        "id": id,
        "codigo": codigo,
        "nome": nome,
        "sigla": sigla
    };
}


async function adicionarPartido() {
    const dadosPartido = pegarDados();
    try {
        const resposta = await fetch("http://localhost:3000/partidos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPartido)
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
            text: "Erro ao adicionar partido: " + erro.message,
            type: "error",
            styling: "bootstrap3",
            delay: 4000,
        });
    }
}

async function mostrarTabelaPartidos() {
    try {
        const resposta = await fetch("http://localhost:3000/partidos", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const dadosRecebidos = await resposta.json();
        const tabela = document.getElementById('tabela-partidos');

        tabela.innerHTML = "";

        const partidos = dadosRecebidos.partidos;
        if (partidos.length > 0) {
            partidos.forEach(partido => {
                const linha = document.createElement('tr');
                linha.classList.add('fade-in');
                linha.innerHTML = `
                    <td data-label="Código:" class='codigo'>${partido.codigo}</td>
                    <td data-label="Nome:">${partido.nome}</td>
                    <td data-label="Sigla:">${partido.sigla}</td>
                    <td data-label="Ações:">
                        <div>
                            <a href='#edicao'><button class="btn btn-info btn-xs" onclick="pegarPartido('${partido.id}','${partido.codigo}','${partido.nome}','${partido.sigla}','atualizar')">Editar</button></a>
                            <button class="btn btn-danger btn-xs excluir" id='${partido.id}' onclick="deletar('${partido.id}')">Excluir</button>
                        </div>
                    </td>
                `;
                tabela.appendChild(linha);
            });
        } else {
            const linha = document.createElement('tr');
            const mediaQuery = window.matchMedia('(max-width: 768px)');
            function handleMediaQueryChange(e) {
                if (e.matches) {
                    linha.innerHTML = `
                    <td style='display:flex;justify-content: center; align-items:center'>Nenhum partido cadastrado...</td>
                `;
                } else {
                    linha.innerHTML = `
                        <td colspan="12">Nenhum partido cadastrado...</td>
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
            text: "Erro ao mostrar tabela de partidos: " + erro.message,
            type: "error",
            styling: "bootstrap3",
            delay: 4000,
        });
    }
}

mostrarTabelaPartidos()

function pegarPartido(id, codigo, nome, sigla, acao) {
    document.getElementById('id').value = id;
    document.getElementById('codigo').value = codigo;
    document.getElementById('nome').value = nome;
    document.getElementById('sigla').value = sigla;
    if (acao == 'atualizar') {
        document.getElementById('btn-salvar').innerHTML = `Editar`;
    }
}

async function atualizarPartido() {
    const dadosPartido = pegarDados();
    try {
        const resposta = await fetch("http://localhost:3000/partidos", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPartido)
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
            setTimeout(() => {
                const botao = document.getElementById('btn-salvar');
                botao.disabled = false;
                botao.innerText = "Editar"
            }, 100)
        }
    } catch (erro) {
        new PNotify({
            title: "Erro!",
            text: "Erro ao adicionar partido: " + erro.message,
            type: "error",
            styling: "bootstrap3",
            delay: 4000,
        });
    }
}
async function excluirPartido(id) {
    try {
        const resposta = await fetch("http://localhost:3000/partidos", {
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
            text: "Erro ao adicionar partido: " + erro.message,
            type: "error",
            styling: "bootstrap3",
            delay: 4000,
        });
    }
}

function deletar(id) {

    botaoExcluir = document.querySelectorAll('.excluir')

    botaoExcluir.forEach(botao => {
        if (botao.id == id) {
            botao.disabled = true;
            botao.innerHTML = `<i class="fa fa-spinner fa-spin" style='padding:0 .9rem'></i>`;
            bootbox.confirm("Você tem certeza que deseja excluir este partido? Todos os candidatos filiados a ele tambem serão excluídos.", function (result) {
                if (result) {
                    excluirPartido(id).then(() => {
                        mostrarTabelaPartidos().then(() => {
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




let navigation = document.querySelector('.nav_menu');

function scroll() {
    if (scrollY > 0) {
        navigation.classList.add('style_nav');
    } else {
        navigation.classList.remove('style_nav');
    }
}