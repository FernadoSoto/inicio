document.addEventListener("DOMContentLoaded", function() {
    $.ajax({
        url: "http://3.210.133.54:3000/api/fechas_civicas",
        method: "GET",
        success: function(data) {
            if (data.length > 0) {
                var message = "";

                for (var i = 0; i < data.length; i++) {
                    var fecha = new Date(data[i].FECHA).toLocaleDateString();
                    var descrip = data[i].DESCRIP;
                    var descripcion = data[i].descripcion;
                    message += "Hoy " + fecha + ", se celebra " + descrip + ".\n";
                }

                Swal.fire({
                    title: message,
                    text: descripcion,
                    imageUrl: 'https://unsplash.it/400/200',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: descripcion,
                });
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
});
