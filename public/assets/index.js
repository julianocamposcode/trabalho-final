window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('nao-autenticado')) {
        document.getElementById("totalPartidos").innerHTML = '-'
        document.getElementById("totalCandidatos").innerHTML = '-'
        document.querySelectorAll('.controle-login').forEach(texto => {
            texto.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.includes('Admin')) {
                    node.textContent = 'Visitante ';
                }
            });
        });

        let sigIn = document.createElement("i");
        sigIn.className = "fa fa-sign-in";
        sigIn.style.marginRight = "5px";

        let sairLogin = document.querySelector(".sairLogin");
        sairLogin.href = '/login'
        sairLogin.innerHTML = '';
        sairLogin.appendChild(sigIn);
        sairLogin.append('Login');

        let sairLoginTopo = document.querySelector('.sairLoginTopo')
        sairLoginTopo.textContent = 'Login'
        sairLoginTopo.href = 'Login'

    } else {
        (async () => {
            const respostaPartido = await fetch("http://localhost:3000/partidos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const respostaCandidatos = await fetch("http://localhost:3000/candidatos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const dadosRecebidosCandidatos = await respostaCandidatos.json();
            const dadosRecebidosPartidos = await respostaPartido.json();

            document.getElementById("totalPartidos").innerHTML = dadosRecebidosPartidos.partidos.length;
            document.getElementById("totalCandidatos").innerHTML = dadosRecebidosCandidatos.candidatos.length;

            document.querySelectorAll('.logo').forEach(logo => {
                logo.src = 'https://cdn-icons-png.flaticon.com/512/4607/4607751.png'
                if (logo.alt == 'imagem usuario') logo.style.padding = '8px'
            });

            const pai = document.getElementById('relacionamento');
            pai.innerHTML = "";

            const partidos = dadosRecebidosPartidos.partidos;
            const candidatos = dadosRecebidosCandidatos.candidatos;

            if (partidos.length > 0) {
                partidos.forEach(partido => {
                    const div = document.createElement('div');
                    div.classList.add('fade-in');
                    div.innerHTML = `
                        <div class="col-md-12 mobile">
                            <div class="x_panel">
                                <div class="x_title">
                                    <h2><a class='link' href='/partidos.html'>${partido.nome}</a>
                                        <small>Candidatos Filiados</small>
                                    </h2>
                                    <ul class="nav navbar-right panel_toolbox">
                                        <li>
                                            <a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                        </li>
                                        <li>
                                            <a class="close-link"><i class="fa fa-close"></i></a>
                                        </li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="x_content">
                                    <table class="table table-striped text-center tabela">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Cpf</th>
                                                <th class="text-center">Titulo de Eleitor</th>
                                                <th class="text-center">Nome</th>
                                                <th class="text-center">Endereço</th>
                                                <th class="text-center">Número</th>
                                                <th class="text-center">Bairro</th>
                                                <th class="text-center">Cidade</th>
                                                <th class="text-center">UF</th>
                                                <th class="text-center">Cep</th>
                                                <th class="text-center">Renda Mensal</th>
                                                <th class="text-center">Partido</th>
                                                <th class="text-center">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tabela-${partido.sigla}"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `;
                    pai.appendChild(div);

                    let tabela = document.getElementById(`tabela-${partido.sigla}`);
                    const candidatosDoPartido = candidatos.filter(c => c.filiacao === partido.sigla);

                    if (candidatosDoPartido.length > 0) {
                        candidatosDoPartido.forEach(candidato => {
                            let linha = document.createElement('tr');
                            linha.innerHTML = `
                                <td data-label="Cpf:">${candidato.cpf}00</td>
                                <td data-label="Titulo de Eleitor:">${candidato.tituloEleitoral}</td>
                                <td data-label="Nome:">${candidato.nome}</td>
                                <td data-label="Endereço:">${candidato.endereco}</td>
                                <td data-label="Número:">${candidato.numero}</td>
                                <td data-label="Bairro:">${candidato.bairro}</td>
                                <td data-label="Cidade:">${candidato.cidade}</td>
                                <td data-label="UF:">${candidato.uf}</td>
                                <td data-label="Cep:">${candidato.cep}</td>
                                <td data-label="Renda Mensal:">${candidato.rendaMensal}</td>
                                <td data-label="Filiação:">${candidato.filiacao}</td>
                                <td data-label="Ações:">
                                    <div>
                                        <a href='/candidatos.html?id=${candidato.id}'>
                                            <button class="btn btn-info btn-xs">Detalhes</button>
                                        </a>
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
                    <td style='display:flex;justify-content: center; align-items:center'>Nenhum candidato filiado a este partido...</td>
                `;
                            } else {
                                linha.innerHTML = `
                        <td colspan="12">Nenhum candidato filiado a este partido...</td>
                    `;
                            }
                        }

                        mediaQuery.addEventListener('change', handleMediaQueryChange);

                        handleMediaQueryChange(mediaQuery);

                        tabela.appendChild(linha);
                    }
                });
            }

            aplicarFuncionalidadesGentella(); // Agora só chama aqui!
        })();
    }

    function aplicarFuncionalidadesGentella() {
        // Botão de fechar painel
        $(document).on("click", ".close-link", function () {
            const panel = $(this).closest(".x_panel");
            panel.remove();
        });

        // Botão de colapsar painel
        $(document).on("click", ".collapse-link", function (e) {
            e.preventDefault();

            const panel = $(this).closest(".x_panel");
            const icon = $(this).find("i");
            const content = panel.find(".x_content");

            if (content.is(':visible')) {
                content.slideUp(200);
                icon.removeClass("fa-chevron-up").addClass("fa-chevron-down");
            } else {
                content.slideDown(200);
                icon.removeClass("fa-chevron-down").addClass("fa-chevron-up");
            }
        });
    }
};


let navigation = document.querySelector('.nav_menu');

function scroll() {
    if (scrollY > 0) {
        navigation.classList.add('style_nav');
    } else {
        navigation.classList.remove('style_nav');
    }
}