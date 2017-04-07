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
                window.location.href = lang + "/success"
            },
            error: (data) => {
                let msg = '<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="lnr lnr-warning"></span> Veuillez tout remplir.</div>'
                $("#publish").prepend(msg)

            }
        })


    })



    // Share

    var popupCenter = function(url, title, width, height) {
        var popupWidth = width || 640;
        var popupHeight = height || 320;
        var windowLeft = window.screenLeft || window.screenX;
        var windowTop = window.screenTop || window.screenY;
        var windowWidth = window.innerWidth || document.documentElement.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2;
        var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
        var popup = window.open(url, title, 'scrollbars=yes, width=' + popupWidth + ', height=' + popupHeight + ', top=' + popupTop + ', left=' + popupLeft);
        popup.focus();
        return true;
    };

    $('.share_twitter').on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('data-url');
        var shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) +
            "&via=Grafikart_fr" +
            "&url=" + encodeURIComponent(url);
        popupCenter(shareUrl, "Partager sur Twitter");
    });

    $('.share_facebook').on('click', function(e) {
        e.preventDefault();
        var url = $(this).attr('data-url');
        var shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
        popupCenter(shareUrl, "Partager sur facebook");
    });

});