// Importa o framework Express
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta onde o servidor vai rodar (pega do ambiente ou usa 3000 como padrão)
const PORT = process.env.PORT || 3000;

// Importa o pacote CORS
var cors = require('cors');

// Ativa o CORS para permitir requisições externas (como de outro domínio)
app.use(cors({ optionsSuccessStatus: 200 }));

// Diz ao Express para servir arquivos estáticos (HTML, CSS, JS, imagens) da pasta 'public'
app.use(express.static('public'));

// Quando alguém acessa a rota principal ("/"), envia o arquivo HTML principal
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html'); // __dirname é o caminho da pasta atual
});

// Rota que responde a /api/:date, onde ":date" é uma data enviada na URL
app.get("/api/:date", function (req, res) {
  const { date } = req.params;     // Pega a data enviada na URL
  const { fh } = req.query;        // Pega o fuso horário enviado na query string (?fh=)

  let finalDate;
  const offset = parseInt(fh) * 3600000; // Converte o fuso horário de horas para milissegundos

  // Verifica se a data recebida é um número (timestamp)
  if (isNaN(date)) {
    finalDate = new Date(date); // Se não for número, tenta criar uma data normal (como "2025-04-11")
  } else {
    finalDate = new Date(parseInt(date)); // Se for número, transforma em data
  }

  // Se a data for inválida, envia uma mensagem de erro
  if (finalDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Corrige a data com base no fuso horário (adiciona ou remove horas)
  finalDateCorrigida = new Date(finalDate.getTime() + offset);

  // Retorna a data corrigida no formato UTC e o valor UNIX (em milissegundos)
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

// Rota que responde a /api (sem data), retornando a data atual
app.get("/api", function (req, res) {
  const dataAtual = new Date(); // Pega a data e hora atuais
  const { fh } = req.query;     // Pega o fuso horário da URL
  const offset = parseInt(fh) * 3600000; // Converte o fuso para milissegundos

  // Ajusta a data atual com o fuso horário
  const dataAtualCorrigida = new Date(dataAtual.getTime() + offset);

  // Retorna a data em formato UNIX e UTC ajustada
  res.json({
    unix: dataAtual.getTime(),
    utc: dataAtualCorrigida.toUTCString()
  });
});

// Rota que responde a /api/diff/:date1/:date2 e calcula a diferença entre duas datas
app.get("/api/diff/:date1/:date2", function (req, res) {
  const { date1 } = req.params; // Primeira data enviada na URL
  const { date2 } = req.params; // Segunda data

  const fDate1 = new Date(date1); // Converte a primeira data para objeto Date
  const fDate2 = new Date(date2); // Converte a segunda data

  // Se alguma das datas for inválida, retorna erro
  if (fDate1.toString() === "Invalid Date" || fDate2.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Calcula a diferença absoluta entre as datas (em milissegundos)
  const diffMs = Math.abs(new Date(date1) - new Date(date2));

  // Converte milissegundos para segundos
  const totalSec = Math.floor(diffMs / 1000);

  // Converte segundos em dias, horas, minutos e segundos
  const dias = Math.floor(totalSec / (60 * 60 * 24));
  const horas = Math.floor((totalSec % (60 * 60 * 24)) / (60 * 60));
  const minutos = Math.floor((totalSec % (60 * 60)) / 60);
  const segundos = totalSec % 60;

  // Envia a resposta com a diferença entre as datas
  res.json({
    dias,
    horas,
    minutos,
    segundos
  });
});

// Inicia o servidor e mostra no console em qual porta está rodando
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});