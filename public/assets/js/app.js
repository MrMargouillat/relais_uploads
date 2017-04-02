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
        let form_data = new FormData(frm)
        console.log(form_data);
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: form_data, // serializes the form's elements.
            success: (data) => {
                alert(data); // show response from the php script.
            },
            error: (res) => {
                console.log(res);
            },
            cache: false,
            contentType: false,
            processData: false
        });


    })

});