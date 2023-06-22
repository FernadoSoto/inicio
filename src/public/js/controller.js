// todo: llamar la url
const url = "http://3.216.22.69:3000/api/personas";

let result = '';

const formArticulo = document.querySelector("form");

const nombres = document.getElementById("NOMBRES");

const email = document.getElementById("EMAIL");

const celular = document.getElementById("CELULAR");

//const foodped = document.getElementById("FOODPED");

const msg = document.getElementById("MSG");

let option = '';

// Boton crear
btnCrear.addEventListener(
    "click", () => {
        console.log("Boton activado");
        option = 'crear';
    }
);

// Formulario
formArticulo.addEventListener(
    'submit', (e) => {
        e.preventDefault();
        if (option == 'crear') {
            if (nombres.value == "" || email.value == "" || celular.value == "" || msg.value == "") {
                alert("Asegúrese de completar todos los campos.");
                return false;
            } else {
                console.log("Todos los campos están completos.");
                fetch(
                    url, {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                NOMBRES: nombres.value,
                                EMAIL: email.value,
                                CELULAR: celular.value,
                                //FOODPED: foodped.value,
                                MSG: msg.value,
                            }
                        )
                    }
                ).then(
                    response => response.json()
                )
                .then(
                    response => location.reload()
                );
            }
        }
    }
);
