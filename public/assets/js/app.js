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
    let frm = $('#form_file')

    frm.submit((e) => {
        console.log("object");
        e.preventDefault()
            // the script where you handle the form input.

        var formdata = (window.FormData) ? new FormData(frm[0]) : null;
        var data = (formdata !== null) ? formdata : frm.serialize();

        $.ajax({
            url: frm.attr('action'),
            type: frm.attr('method'),
            contentType: false, // obligatoire pour de l'upload
            processData: false, // obligatoire pour de l'upload
            dataType: 'json', // selon le retour attendu
            data: data,
            success: (data) => {
                console.log(data); // show response from the php script.
            },
            error: (res) => {
                console.log(res);
            }
        });


    })


});