
const form = document.getElementById("formCandidato");
const msg = document.getElementById("mensagem");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Coletar os dados do formulário
    const candidato = {
        cpf: form.cpf.value,
        titulo: form.titulo.value,
        nome: form.nome.value,
        endereco: form.endereco.value,
        numero: form.numero.value,
        bairro: form.bairro.value,
        cidade: form.cidade.value,
        uf: form.uf.value.toUpperCase(),
        cep: form.cep.value,
        renda: form.renda.value,
    };

    console.log("Candidato cadastrado:", candidato);

    // Exibe mensagem de sucesso
    msg.style.display = "block";
    setTimeout(() => (msg.style.display = "none"), 3000);

    // Limpar o formulário
    form.reset();
});