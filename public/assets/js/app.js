$(document).ready(() => {
    let lang = $("html").attr("lang")
    $.ajax("http://localhost:8080/api/meetings/" + lang)
        .done(data => {
            let meetings = $("#meetings")
            data.forEach(el => {
                let str = el.year + ": " + el.theme + " - " + el.place
                meetings.append("<option value='" + el.id + "' >" + str + "</option>")
            })
        })
        .fail(() => {
            alert("Erreur dans le chargement des meetings.")
        })


    $('#form_file [dt-require]').blur(function(e) {

        if (e.target.value === "") {
            $(this).addClass("form-control-danger")
            $(this).parent("div").addClass("has-danger")
        } else {
            $(this).removeClass("form-control-danger")
            $(this).parent("div").removeClass("has-danger")
        }
    });



    let frm = $('#form_file')
    frm.submit((e) => {
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
            error: (data) => {
                let msg = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="lnr lnr-warning"></span> Veuillez tout remplir.</div>'
                $("#publish").prepend(msg)

            }
        })


    })


});