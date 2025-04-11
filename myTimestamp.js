// Importa o módulo Express
const express = require('express');
// Cria uma instância do aplicativo Express
const app = express();
// Define a porta, usando uma variável de ambiente ou padrão 3000
const PORT = process.env.PORT || 3000;

// Importa e configura o middleware CORS para permitir requisições de outros domínios
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve arquivos estáticos a partir da pasta 'public'
app.use(express.static('public'));

// Rota raiz que envia o arquivo HTML principal (index.html)
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint que recebe uma data como parâmetro e um fuso horário opcional como query string
app.get("/api/:date", function (req, res) {
  const { date } = req.params;       // Pega a data da URL
  const { fh } = req.query;          // Pega o fuso horário da query string (ex: ?fh=-3)
  let finalDate;
  const offset = parseInt(fh) * 3600000; // Converte o fuso horário para milissegundos

  // Verifica se a data é uma string (ex: "2025-04-11") ou um número (timestamp em ms)
  if (isNaN(date)) {
    finalDate = new Date(date);
  } else {
    finalDate = new Date(parseInt(date));
  }

  // Verifica se a data é inválida
  if (finalDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Aplica o fuso horário (deslocamento em milissegundos)
  finalDateCorrigida = new Date(finalDate.getTime() + offset);

  // Retorna os dados no formato UNIX e UTC com horário ajustado
  if (isNaN(date)) {
    res.json({
      utc: finalDateCorrigida.toUTCString(),
      unix: finalDate.getTime()
    });
    return;
  } else {
    res.json({
      unix: finalDate.getTime(),
      utc: finalDateCorrigida.toUTCString()
    });
    return;
  }
});

// Endpoint para retornar a data atual (com ou sem fuso horário)
app.get("/api", function (req, res) {
  const dataAtual = new Date(); // Data atual
  const { fh } = req.query;     // Fuso horário (ex: ?fh=+3)
  const offset = parseInt(fh) * 3600000;

  // Aplica o fuso horário à data atual
  const dataAtualCorrigida = new Date(dataAtual.getTime() + offset);

  // Retorna as informações da data atual
  res.json({
    unix: dataAtual.getTime(),
    utc: dataAtualCorrigida.toUTCString()
  });
});

// Endpoint que calcula a diferença entre duas datas fornecidas na URL
app.get("/api/diff/:date1/:date2", function (req, res) {
  const { date1 } = req.params;
  const { date2 } = req.params;

  // Verifica se as datas são válidas
  if (date1.toString() === "Invalid Date" || date2.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Calcula a diferença absoluta entre as datas em milissegundos
  const diffMs = Math.abs(new Date(date1) - new Date(date2));

  // Converte a diferença para segundos
  const totalSeconds = Math.floor(diffMs / 1000);

  // Quebra o total de segundos em dias, horas, minutos e segundos
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  // Retorna a diferença formatada
  res.json({
    days,
    hours,
    minutes,
    seconds
  });
});

// Inicializa o servidor na porta definida
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});