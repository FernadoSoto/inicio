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
            // Rest of the code for submitting the form
        }
    }
});

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate celular format
function validateCelular(celular) {
    // Assuming celular should be a 10-digit number
    const celularRegex = /^\d{10}$/;
    return celularRegex.test(celular);
}

