// todo: llamar la url
const url = "http://3.210.133.54:3000/api/personas";

let result = '';

const formArticulo = document.querySelector("form");

const nombres = document.getElementById("NOMBRES");

const email = document.getElementById("EMAIL");

const celular = document.getElementById("CELULAR");

//const foodped = document.getElementById("FOODPED");

const msg = document.getElementById("MSG");

let option = '';

// Boton crear
btnCrear.addEventListener("click", () => {
    console.log("Boton activado");
    option = 'crear';
});

// Formulario
formArticulo.addEventListener('submit', (e) => {
    e.preventDefault();
    if (option == 'crear') {
        if (nombres.value == "" || email.value == "" || celular.value == "" || msg.value == "") {
            alert("Asegúrese de completar todos los campos.");
            return false;
        } else if (!validateEmail(email.value)) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return false;
        } else if (!validateCelular(celular.value)) {
            alert("Por favor, ingrese un número de teléfono válido.");
            return false;
        } else {
            console.log("Todos los campos están completos.");
            submitForm();
        }
    }
});

// formato para enviar el correo
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// formato para enviar el celular
function validateCelular(celular) {
    // Assuming celular should be a 9-digit number
    const celularRegex = /^\d{9}$/;
    return celularRegex.test(celular);
}

// enviar el form
function submitForm() {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NOMBRES: nombres.value,
            EMAIL: email.value,
            CELULAR: celular.value,
            MSG: msg.value,
        })
    }).then(response => response.json())
      .then(response => {
          console.log("Formulario enviado exitosamente");
          location.reload();
      })
      .catch(error => {
          console.error("Error al enviar el formulario:", error);
      });
}

