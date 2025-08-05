// Validação de Nome
function validarNome(nome) {
    if (!nome.trim()) {
        alert("Por favor, preencha o nome.");
        return false;
    }
    if (nome.length < 2) {
        alert("O nome é muito curto.");
        return false;
    }
    return true;
}

// Validação de Sobrenome
function validarSobrenome(sobrenome) {
    if (!sobrenome.trim()) {
        alert("Por favor, preencha o sobrenome.");
        return false;
    }
    if (sobrenome.length < 2) {
        alert("O sobrenome deve ter pelo menos 2 caracteres.");
        return false;
    }
    return true;
}

// Validação de Nome de Exibição
function validarExibicao(nomeExibicao) {
    if (!nomeExibicao.trim()) {
        alert("Por favor, preencha o nome de exibição.");
        return false;
    }
    return true;
}

// Validação de Email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        alert("Por favor, insira o email.");
        return false;
    }
    if (!regex.test(email)) {
        alert("Insira um email válido.");
        return false;
    }
    return true;
}

// Validação de Confirmação de Email
function validarConfirmacaoEmail(email, confirmEmail) {
    if (email !== confirmEmail) {
        alert("Os emails não coincidem.");
        return false;
    }
    return true;
}

// Validação de Telefone
function validarTelefone(telefone) {
    const regex = /^[0-9]{8,15}$/; // Aceita de 8 a 15 dígitos
    if (!telefone.trim()) {
        alert("Por favor, insira seu telefone.");
        return false;
    }
    if (!regex.test(telefone)) {
        alert("Insira um número de telefone válido (somente números).");
        return false;
    }
    return true;
}

// Função Principal — Validação Geral
function salvarCadastro() {
    const nome = document.getElementById("firstname").value;
    const sobrenome = document.getElementById("lastname").value;
    const exibicao = document.getElementById("exibname").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("valiemail").value;
    const telefone = document.getElementById("phone").value;
    const ddd = document.getElementById("country-code").value;

    // Executa cada validação
    if (
        validarNome(nome) &&
        validarSobrenome(sobrenome) &&
        validarExibicao(exibicao) &&
        validarEmail(email) &&
        validarConfirmacaoEmail(email, confirmEmail) &&
        validarTelefone(telefone)
    ) {
        // Se tudo estiver correto, executa o cadastro
        const dados = {
            nome: nome,
            sobrenome: sobrenome,
            nomeExibicao: exibicao,
            email: email,
            telefone: `${ddd} ${telefone}`
        };

        // Salvando no localStorage (como simulação de "registro")
        localStorage.setItem("usuarioCadastrado", JSON.stringify(dados));

        alert("Usuário cadastrado com sucesso!");

        // Limpa os campos
        limparFormulario();

        // Redireciona para a página de termos
        window.location.href = "./home/home.html";
    }
}

// Limpar o Formulário após cadastro
function limparFormulario() {
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("exibname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("valiemail").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("country-code").value = "+55";
}
