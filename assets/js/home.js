// Dados do usuário
const dados = JSON.parse(localStorage.getItem('dadosCadastro'));
console.log(dados);

// Primeiros socorros - Passos
const steps = [
    `<h3>1️⃣ Avaliação do Ambiente</h3><p>Verifique se o local é seguro para você e para a vítima.</p>`,
    `<h3>2️⃣ Verificar Consciência</h3><p>Toque no ombro e pergunte: "Você está bem?".</p>`,
    `<h3>3️⃣ Acione Ajuda</h3><p>Ligue 192 (SAMU) ou 193 (Bombeiros).</p>`,
    `<h3>4️⃣ Avalie a Respiração</h3><p>Veja se há respiração observando movimentos torácicos ou ouvindo sons.</p>`,
    `<h3>5️⃣ RCP</h3><p>Se não respirar: 30 compressões + 2 ventilações.</p>`,
    `<h3>6️⃣ Cuidados com Ferimentos</h3><p>Controle sangramentos, lave queimaduras e imobilize fraturas.</p>`,
    `<h3>7️⃣ Acompanhe</h3><p>Fique com a vítima até o socorro chegar.</p>`
];

// Modal navegação
let currentStep = 0;

// Seletores gerais
const modals = document.querySelectorAll('.modal');
const openModalBtns = document.querySelectorAll('.openModalBtn');
const closeBtns = document.querySelectorAll('.close');
const nextBtns = document.querySelectorAll('.nextBtn');
const prevBtns = document.querySelectorAll('.prevBtn');

// Abrir modal
openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.getElementById(btn.dataset.modal);
        modal.style.display = 'flex';

        // Se for o modal de primeiros socorros
        if (btn.dataset.modal === 'modal1') {
            currentStep = 0;
            document.getElementById('content1').innerHTML = steps[currentStep];
        }
    });
});

// Fechar modal
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.style.display = 'none';
    });
});

// Próximo passo
nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            document.getElementById(btn.dataset.content).innerHTML = steps[currentStep];
        }
    });
});

// Passo anterior
prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            document.getElementById(btn.dataset.content).innerHTML = steps[currentStep];
        }
    });
});

// Fechar clicando fora
window.onclick = function(event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
