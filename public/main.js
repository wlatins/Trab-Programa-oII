function updateUrl(event) {
    event.preventDefault();
    const date = document.getElementById('date').value.trim();
    const fusohorario = document.getElementById('fusohorario').value;
    if (date) {
        window.location.href = '/api/' + encodeURIComponent(date) + '?fh=' + encodeURIComponent(fusohorario);
    } else {
        window.location.href = '/api' + '?fh=' + encodeURIComponent(fusohorario);
    }
}

function updateUrl2(event) {
    event.preventDefault();
    const date1 = document.getElementById('date1').value.trim();
    const date2 = document.getElementById('date2').value.trim();
    if (date1 && date2) {
        window.location.href = '/api/diff/' + encodeURIComponent(date1) + '/' + encodeURIComponent(date2);
    } else{
        document.writeln("<h2>Você esqueceu de escrever uma das duas datas!</h2>");
    }
}
