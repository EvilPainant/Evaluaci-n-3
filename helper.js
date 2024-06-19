const verificar = (id) => {
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
    if (input.value.trim() == '') {
        input.classList.add('is-invalid')
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''

        if (id == 'precio') {
            if (input.value < 0) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No puede ser negativoc</span>'

            }
        }
        if (id == 'anho') {
            const dia = validarFecha(input.value);
            if (dia <= 0) {
                input.classList.add('is-invalid');
                div.innerHTML =
                    `<span class="badge bg-danger">Solo autos del 2000 en adelante</span>`;
            }
        }
        if (id == 'kilometraje') {
            if ((input.value < 0)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El kilometraje no puede ser negatovich</span>'
            }
        }
    }
}

const modeloExiste = async (modelo) => {
    const collection = await obtenerTodosLosModelos(); // Esta función debe devolver todos los modelos de la base de datos
    return collection.includes(modelo);
}


const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById(`e-${item.name}`).innerHTML = ''
    })
    // Deseleccionar todos los botones de opción y eliminar la validación
    document.querySelectorAll('input[name="matricula"]').forEach(radio => {
        radio.checked = false;
        radio.classList.remove('is-invalid');
    })
    document.getElementById('e-matricula').innerHTML = '';
}



const verificaradio = (name) => {
    const inputs = document.getElementsByName(name);
    const div = document.getElementById('e-' + name);
    let isChecked = false;
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        if (input.checked) {
            isChecked = true;
        }
    });
    if (!isChecked) {
        inputs.forEach(input => {
            input.classList.add('is-invalid');
        });
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>';
    } else {
        inputs.forEach(input => {
            input.classList.add('is-valid');
        });
        div.innerHTML = '';
    }
}


const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}

const validarFecha = (fecha) => {
    const hoy = new Date();
    fecha = new Date(fecha);
    if (fecha.getFullYear() < 1999) {
        return -1;
    }
    const resta = hoy - fecha;
    const dia = resta / (1000 * 60 * 60 * 24);
    return dia.toFixed(0);
}
