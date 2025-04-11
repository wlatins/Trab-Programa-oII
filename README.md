# Trab-Programa-oII
Trabalho Prático I: Desenvolvimento de um Microsserviço de Timestamp
Se quiser colocar uma data em utc, coloca ela em MM-DD-YYYY, não vai funcionar com DD-MM-YYYY, qualquer coisa tem como colocar dessa forma pra aceitar DD-MM-YYYY (peguei essa parte do chat, pois estou com preguiça pq to fazendo isso na madrugada da sexta do dia 11/04):

app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  let finalDate;

  if (isNaN(date)) {
    const dateParts = date.split("-");
    if (dateParts.length === 3 && dateParts[0].length === 2 && dateParts[1].length === 2 && dateParts[2].length === 4) {
      const correctedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      finalDate = new Date(correctedDate);
    } else {
      finalDate = new Date(date);
    }
  } else {
    finalDate = new Date(parseInt(date));
  }

  if (finalDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  if (isNaN(date)){
    res.json({
      utc: finalDate.toUTCString(),
      unix: finalDate.getTime()
    });
    return;
  } else{
    res.json({
      unix: finalDate.getTime(),
      utc: finalDate.toUTCString()
    });
    return;
  }
});