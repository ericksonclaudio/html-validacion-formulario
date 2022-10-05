export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }


    if (input.validity.valid) {
        console.log("prueba")
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";

    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajeError = {
    nombre: {
        valueMissing: "El campo del nombre no puede estar vacío",
    },

    email: {
        valueMissing: "El campo de email no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo de password no puede estar vacío",
        patternMismatch: "Debe tener al menos 6 caracteres y máximo 12, una letra mayúscula, una letra mínuscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "El campo de nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo de número telefónico no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },

    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "El campo dirección debe tener entre 4 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo de número telefónico no puede estar vacío",
        patternMismatch: "El campo ciudad debe tener entre 4 y 40 caracteres"
    },
    estado: {
        valueMissing: "El campo de número telefónico no puede estar vacío",
        patternMismatch: "El campo estado debe tener entre 4 y 40 caracteres"
    },

}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};


function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = "";

    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

/*const inputNacimiento = document.querySelector("#birth");
inputNacimiento.addEventListener('blur', (evento) => {
    validarNacimiento(evento.target)
});*/


function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {

        mensaje = 'Debes tener al menos 18 años';
    }

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fechaCliente) {

    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fechaCliente.getUTCFullYear() + 18,
        fechaCliente.getUTCMonth(),
        fechaCliente.getUTCDate());

    return diferenciaFecha <= fechaActual;

}