const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Login padrão
  if (usuario === "admin" && senha === "1234") {
    // Cria uma sessão simples válida por 30 minutos
    const expira = new Date();
    expira.setMinutes(expira.getMinutes() + 30);
    localStorage.setItem("sessao", JSON.stringify({ usuario, expira }));

    window.location.href = "index.html"; // redireciona após login
  } else {
    alert("Usuário ou senha incorretos.");
  }
});