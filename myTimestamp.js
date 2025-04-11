const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req, res) {
    const date = req.params.date;
    const a = new Date(date).toUTCString();
    const b = new Date(date).getTime();

    if(date == a){
        res.json({'utc': (new Date(date)).toUTCString(), 'unix': (new Date(date)).getTime()});
    }
    if(date == b){
        res.json({'unix': (new Date(date)).getTime(), 'utc': (new Date(date)).toUTCString()});
    }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});