function updateUrl(form) {
    form.action = form.action.replace('?', '') + "api/" + form[0].value;
    form.submit();
}