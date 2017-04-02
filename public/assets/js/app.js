$(document).ready(() => {
    $.ajax("http://localhost:8080/api/meetings/")
        .done(data => {
            let meetings = $("#meetings")
            data.forEach(el => {
                let str = el.year + " " + el.place
                meetings.append("<option value='" + el.id + "' >" + str + "</option>")
            })
        })
        .fail(() => {
            alert("Erreur")
        })
});