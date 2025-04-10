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
            const resposta = await fetch("http://localhost:3000/partidos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dadosRecebidos = await resposta.json();

            document.getElementById("totalPartidos").innerHTML = dadosRecebidos.partidos.length;
        })();

        (async () => {
            const resposta = await fetch("http://localhost:3000/candidatos", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dadosRecebidos = await resposta.json();
            document.getElementById("totalCandidatos").innerHTML = dadosRecebidos.candidatos.length;
        })();

        document.querySelectorAll('.logo').forEach(logo => {
            logo.src = 'https://cdn-icons-png.flaticon.com/512/4607/4607751.png'
            logo.alt == 'imagem usuario' ? logo.style.padding = '8px' : null
        })
    }
}


