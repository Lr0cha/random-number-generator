const button = document.getElementById("btn_draw_numbers");
//ao clique do botão
button.addEventListener("click", function () {
    const max = input.max_number();
    const min = input.min_number();
    const qtd_numbers = input.qtd_draw_numbers();
    let results = generateUniqueNumbers(qtd_numbers,min,max);
    if (qtd_numbers === 1) {
        let result = Math.floor(Math.random() * (max - min + 1)) + min;
        document.querySelector("#result").textContent = result;
    }
    else{
        let results = generateUniqueNumbers(qtd_numbers, min, max);
        if (qtd_numbers < 10) {
            document.querySelector("#result").textContent = results.join(', ');
        } else {
            // Armazena os resultados no localStorage e redireciona para a página de resultados > 9
            localStorage.setItem("results", JSON.stringify(results));
            window.location.href = "html/results.html";
        }
    }
    clearInputs();
    buttonEnable();
});

function generateUniqueNumbers(count, min, max) {
    let results = [];//inicia array para receber os num sorteados
    while (results.length < count) {
        let newNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        //se o num ainda não foi sorteado e ja esta no array
        if (!results.includes(newNumber)) {
            results.push(newNumber);
        }
    }
    return results;
}


//muda o texto para número caso 1, ou números quando > 1
function textDrawNumber() {
    const text = document.getElementById("text_draw_number");
    const number = input.qtd_draw_numbers();
    text.innerHTML = number > 1 ? "números" : "número";
}

function clearInputs(){
    document.getElementById("min").value = "";
    document.getElementById("max").value = "";
    document.getElementById("draw_number_input").value = 1;
    document.getElementById("text_draw_number").innerHTML = "número";
}

function checkInputMin() {
    const number_minimum = input.min_number();
    const text_error = document.getElementById("error_min");
    const number_valid = fieldIsValid(number_minimum);
    text_error.innerHTML = number_valid ? "" : "Número não preenchido";
    buttonEnable();
}

function checkInputMax() {
    const number_maximum = input.max_number();
    const text_error = document.getElementById("error_max");
    const number_valid = fieldIsValid(number_maximum);
    text_error.innerHTML = number_valid ? "" : "Número não preenchido";
    buttonEnable();
}

function fieldIsValid(number) {
    return !isNaN(number) && isFinite(number) && number !== "";
}

function verifyMinLessThanMax() {
    return input.min_number() <= input.max_number();
}

function ensureDrawCountIsValid() {
    const min = input.min_number();
    const max = input.max_number();
    const qtd = input.qtd_draw_numbers();
    const interval = max - min + 1;
    return (qtd > interval) ? false : true;
}

function buttonEnable() {
    const qtd_draw_numbers = fieldIsValid(input.qtd_draw_numbers());
    const input_min = fieldIsValid(input.min_number());
    const input_max = fieldIsValid(input.max_number());
    const inputs_valid = verifyMinLessThanMax() && ensureDrawCountIsValid();

    document.getElementById("btn_draw_numbers").disabled = !(inputs_valid && qtd_draw_numbers && input_min && input_max);
}

//caso o num de sorteios >1 automaticamente volta para 1
function drawNumbersLessThan0(){
    if(document.getElementById("draw_number_input").value < 1){
        document.getElementById("draw_number_input").value = 1;
    }
}
// obj para facilitar o getters para referenciar inputs
const input = {
    qtd_draw_numbers: () => parseInt(document.getElementById("draw_number_input").value, 10),
    min_number: () => parseInt(document.getElementById("min").value, 10),
    max_number: () => parseInt(document.getElementById("max").value, 10)
};
