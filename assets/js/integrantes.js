// Dados dos integrantes
const integrantes = [
    {
        id: 1,
        nome: "Luiz Felipe Flosi | RM: 563197 - 1TDSPG",
        imagem: "../image/felipeflosi.jpg",
        descricao: "Sou uma pessoa dedicada, comprometida e sempre disposta a colaborar em projetos que façam a diferença. Tenho interesse em tecnologia, desenvolvimento web e soluções que impactem positivamente a sociedade. No projeto SecureWay, atuo na criação, desenvolvimento e organização do site, buscando tornar a informação acessível, clara e útil para todos que precisam.",
        github: "https://github.com/felipeflosii",
        linkedin: "www.linkedin.com/in/felipeflosii"
    },
    {
        id: 2,
        nome: "Arthur Brito da Silva | RM: 562085 - 1TDSPG",
        imagem: "../image/arthurbrito.jpg",
        descricao: "Sou estudante de Análise e Desenvolvimento de Sistemas na FIAP, apaixonado por tecnologia e inovação. Tenho habilidades em desenvolvimento de software e lógica de programação. Atualmente, participo de projetos acadêmicos que buscam criar soluções tecnológicas para gerar impacto positivo na sociedade. Gosto de trabalhar em equipe, aprender coisas novas e enfrentar desafios que contribuam para meu crescimento profissional e pessoal.",
        github: "https://github.com/thubrito",
        linkedin: "https://www.linkedin.com/in/arthur-brito-da-silva-06658b276/"
    },
    {
        id: 3,
        nome: "Pedro Brum | RM: 561780 - 1TDSPG",
        imagem: "../image/pedrobrum.jpg",
        descricao: "Sou estudante de tecnologia com experiência em desenvolvimento web e em projetos voltados à área da saúde. Trabalho com Python, HTML, CSS e JavaScript, focando em soluções acessíveis e integração com APIs.",
        github: "https://github.com/PedroBrum-DEV",
        linkedin: "https://www.linkedin.com/in/pedro-brum-66a31b326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    }
];

// Abrir Modal
function openModal(id) {
    const integrante = integrantes.find(item => item.id === id);

    if (integrante) {
        document.getElementById('modal-img').src = integrante.imagem;
        document.getElementById('modal-name').innerText = integrante.nome;
        document.getElementById('modal-desc').innerText = integrante.descricao;
        document.getElementById('modal-github').href = integrante.github;
        document.getElementById('modal-linkedin').href = integrante.linkedin;

        document.getElementById('modal').style.display = 'flex';
    }
}

// Fechar Modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fechar ao clicar fora do conteúdo
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});
