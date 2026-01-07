function entrar() {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const msg = document.getElementById("msg");

    msg.innerText = ""; // limpa msg anterior

    if (!user || !pass) {
        msg.innerText = "Preencha todos os campos";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.nome === user);

    if (!usuario) {
        msg.innerText = "❌ Usuário não encontrado";
        return;
    }

    if (usuario.senha !== pass) {
        msg.innerText = "❌ Senha incorreta";
        return;
    }

    // login OK
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuario", user);
    window.location.href = "index.html";
}

function cadastrar() {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const msg = document.getElementById("msg");

    msg.innerText = "";

    if (!user || !pass) {
        msg.innerText = "Preencha todos os campos";
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.find(u => u.nome === user)) {
        msg.innerText = "Usuário já existe";
        return;
    }

    usuarios.push({ nome: user, senha: pass });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    msg.innerText = "Cadastro feito! Agora clique em Entrar.";
}