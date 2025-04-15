window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const botao = document.getElementById('login')

    botaoComport = (bolean) => {
        botao.disabled = bolean;
        bolean ? botao.innerHTML = `<i class="fa fa-spinner fa-spin"></i><span>Entrando</span>` : botao.innerHTML = `Login`;
    }
    if (urlParams.has('erro')) {
        botaoComport(true)
        setTimeout(() => {
            botaoComport(false)
            new PNotify({
                title: "Erro ao entrar!",
                text: 'Usuário ou senha incorretos.',
                type: "error",
                styling: "bootstrap3",
                delay: 4000,
            });
        }, 1000)
    }
    if (urlParams.has('destino')) {
        const destino = urlParams.get('destino');
        botaoComport(true)
        setTimeout(() => {
            botaoComport(false)
            new PNotify({
                title: "Sucesso!",
                text: 'Login realizado com sucesso.',
                type: "success",
                styling: "bootstrap3",
                delay: 4000,
            });
        }, 1000)

        setTimeout(() => {
            window.location.href = destino
        }, 2500)
    }
};


const senhaInput = document.getElementById('senha');
const toggleSenha = document.getElementById('toggleSenha');

toggleSenha.addEventListener('click', function () {
    const tipo = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
    senhaInput.setAttribute('type', tipo);

    
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

