const form = document.getElementById("form-partido");
      const tabela = document.getElementById("tabela-partidos");
      let partidos = [];

      function renderizarTabela() {
        tabela.innerHTML = "";
        partidos.forEach((p, i) => {
          tabela.innerHTML += `
          <tr>
            <td>${p.codigo}</td>
            <td>${p.nome}</td>
            <td>${p.sigla}</td>
            <td>
              <button class="btn btn-sm btn-primary" onclick="editar(${i})">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="excluir(${i})">Excluir</button>
            </td>
          </tr>
        `;
        });
      }

      function editar(indice) {
        const partido = partidos[indice];
        document.getElementById("codigo").value = partido.codigo;
        document.getElementById("nome").value = partido.nome;
        document.getElementById("sigla").value = partido.sigla;
        document.getElementById("indice").value = indice;
      }

      function excluir(indice) {
        if (confirm("Deseja excluir este partido?")) {
          partidos.splice(indice, 1);
          renderizarTabela();
        }
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const codigo = document.getElementById("codigo").value.trim();
        const nome = document.getElementById("nome").value.trim();
        const sigla = document.getElementById("sigla").value.trim();
        const indice = document.getElementById("indice").value;

        if (!codigo || !nome || !sigla) {
          alert("Todos os campos são obrigatórios.");
          return;
        }

        const novoPartido = { codigo, nome, sigla };

        if (indice === "") {
          partidos.push(novoPartido);
        } else {
          partidos[indice] = novoPartido;
          document.getElementById("indice").value = "";
        }

        form.reset();
        renderizarTabela();
      });

      // opcional: salvar localmente durante o desenvolvimento
      window.addEventListener("beforeunload", () => {
        localStorage.setItem("partidos", JSON.stringify(partidos));
      });

      window.addEventListener("load", () => {
        const dadosSalvos = localStorage.getItem("partidos");
        if (dadosSalvos) partidos = JSON.parse(dadosSalvos);
        renderizarTabela();
      });