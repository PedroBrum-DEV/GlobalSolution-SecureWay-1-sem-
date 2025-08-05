function abrirModal(id) {
    document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
    document.getElementById(id).style.display = "none";
}

// Fecha se clicar fora do modal
window.onclick = function(event) {
    const modais = document.getElementsByClassName('modal');
    for (let modal of modais) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
