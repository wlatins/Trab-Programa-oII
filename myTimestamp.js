const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  const { fh } = req.query;
  let finalDate;
  const offset = parseInt(fh) * 3600000;

  if (isNaN(date)) {
    finalDate = new Date(date);
  } else {
    finalDate = new Date(parseInt(date));
  }

  if (finalDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  finalDateCorrigida = new Date(finalDate.getTime() + offset);

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

app.get("/api", function (req, res) {
  const dataAtual = new Date();
  const { fh } = req.query;
  const offset = parseInt(fh) * 3600000;

  const dataAtualCorrigida = new Date(dataAtual.getTime() + offset);

  res.json({
    unix: dataAtual.getTime(),
    utc: dataAtualCorrigida.toUTCString()
  });
});

app.get("/api/diff/:date1/:date2", function (req, res) {
  const { date1 } = req.params;
  const { date2 } = req.params;

  if (date1.toString() === "Invalid Date" || date2.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  const diffMs = Math.abs(new Date(date1) - new Date(date2));

  const totalSec = Math.floor(diffMs / 1000);

  const dias = Math.floor(totalSec / (60 * 60 * 24));
  const horas = Math.floor((totalSec % (60 * 60 * 24)) / (60 * 60));
  const minutos = Math.floor((totalSec % (60 * 60)) / 60);
  const segundos = totalSec % 60;
 
  res.json({
    dias,
    horas,
    minutos,
    segundos
  });
});

var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});