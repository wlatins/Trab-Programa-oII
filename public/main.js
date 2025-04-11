// Função que é chamada quando o primeiro formulário (timestamp) é enviado
function updateUrl(event) {
    // Impede o comportamento padrão do formulário, que seria recarregar a página
    // `event` representa o evento de envio do formulário (submit)
    event.preventDefault();

    // Pega o valor digitado no campo de data e remove espaços extras nas pontas
    const date = document.getElementById('date').value.trim();

    // Pega o valor selecionado no campo de fuso horário
    const fusohorario = document.getElementById('fusohorario').value;

    // Se o campo de data tiver algum valor
    if (date) {
        // Redireciona o navegador para o endpoint /api com a data e o fuso horário como parâmetros
        // `encodeURIComponent` serve para garantir que caracteres especiais (ex: espaços, acentos) não quebrem a URL
        window.location.href = '/api/' + encodeURIComponent(date) + '?fh=' + encodeURIComponent(fusohorario);
    } else {
        // Se não tiver data, redireciona apenas com o fuso horário para pegar a data atual do servidor
        window.location.href = '/api' + '?fh=' + encodeURIComponent(fusohorario);
    }
}

// Função que é chamada quando o segundo formulário (diferença entre datas) é enviado
function updateUrl2(event) {
    // Impede o comportamento padrão do formulário (recarregar a página ao submeter)
    event.preventDefault();

    // Pega a data 1 digitada no input e remove espaços desnecessários
    const date1 = document.getElementById('date1').value.trim();

    // Pega a data 2 digitada no input e remove espaços desnecessários
    const date2 = document.getElementById('date2').value.trim();

    // Verifica se ambas as datas foram preenchidas
    if (date1 && date2) {
        // Redireciona para o endpoint /api/diff com as duas datas como parâmetros
        window.location.href = '/api/diff/' + encodeURIComponent(date1) + '/' + encodeURIComponent(date2);
    } else {
        // Se uma das datas estiver vazia, mostra uma mensagem na tela avisando o usuário
        document.writeln("<h2>Você esqueceu de escrever uma das duas datas!</h2>");
    }
}