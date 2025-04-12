function updateUrl(event) { //Cria uma função chamada updateUrl, que será usada quando a pessoa clicar no botão de submissão
    event.preventDefault(); //Não quero que a página seja atualizada quando o formulário for enviado

    const date = document.getElementById('date').value.trim(); //Pego o valor que foi digitado no input com id date e se existirem espaços vazios no começo e fim da data, eles são removidos
    const fusohorario = document.getElementById('fusohorario').value; //Pego o valor que foi slecionado no menu suspenso de seleção

    if (date) { //Verifico se algo foi digitado no input
        window.location.href = '/api/' + encodeURIComponent(date) + '?fh=' + encodeURIComponent(fusohorario); //Levo o usuário para uma nova URL com /api/, date, ?fh=fusohorario. Por exemplo: /api/2025-04-11?fh=-3
    } else {
        window.location.href = '/api' + '?fh=' + encodeURIComponent(fusohorario); //Se não tiver data, ainda assim rdeireciona, mas a URL fica sem a parte da data, apenas com o fuso horário: /api?fh=-3
    }
}

function updateUrl2(event) { //Outra função parecida, chamada updateUrl2, vou usá-la para comparar duas datas
    event.preventDefault(); //Mesma coisa da updateUrl(event)

    const date1 = document.getElementById('date1').value.trim(); //Pego o valor que foi digitado no input com id date1 e se existirem espaços vazios no começo e fim da data, eles são removidos
    const date2 = document.getElementById('date2').value.trim(); //Pego o valor que foi digitado no input com id date2 e se existirem espaços vazios no começo e fim da data, eles são removidos

    if (date1 && date2) { //Verifico se dois valores foram digitados no input
        window.location.href = '/api/diff/' + encodeURIComponent(date1) + '/' + encodeURIComponent(date2); //Levo o usuário para uma nova URL com /api/diff/, date1/, date2. Por exemplo: /api/diff/2025-04-11/2025-03-11
    } else {
        // document.writeln('<h1 style="color: #E91E63ed; font-family: Poppins, sans-serif;">Você esqueceu de escrever uma das duas datas! (Recarregue a página)</h1>'); (tinha feito dessa forma, funcionou apenas a cor, eu não fazia ideia de como estilizar a fonte, então pedi ajuda pro chat e ele deu um alternativa que não acabava com o meu html)
        const msgContainer = document.getElementById("mensagem-erro"); //Procura um elemento no HTML com id="mensagem-erro"

        msgContainer.innerHTML = `<h1 style="color: #E91E63ed; font-family: Poppins, sans-serif;">Você esqueceu de escrever uma ou as duas datas! (Recarregue a página para apagar essa mensagem)</h1>`; //Insere uma mensagem de erro estilizada dentro desse elemento
    }
}