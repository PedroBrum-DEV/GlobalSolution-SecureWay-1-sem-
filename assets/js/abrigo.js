// Seleciona todos os cards e modais
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// Abre o modal correspondente
cards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

// Fecha ao clicar fora do conteúdo do modal
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});

// Fecha com tecla ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => modal.style.display = 'none');
    }
});


