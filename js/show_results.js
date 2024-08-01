// Recupera os resultados do localStorage
const results = JSON.parse(localStorage.getItem("results"));
const resultsElement = document.getElementById("results");

// Adiciona a classe para estilizar o resultado
resultsElement.classList.add("show-result");
if (results) {
    document.getElementById("results").textContent = results.join(', ');
} else {
    document.getElementById("results").textContent = 'Nenhum resultado disponível.';
}
// Limpa os resultados do localStorage
localStorage.removeItem('results');

function backToHome(){
    window.location.href = "../index.html";
}
