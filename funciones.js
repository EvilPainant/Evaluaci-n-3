import { eliminar, getData, obtener, save, update } from "./firebase.js"

let id = 0
//addEventListener me permite capturar un evento 
document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const vehiculo = {
            'marca': document.getElementById('marca').value.trim(),
            'modelo': document.getElementById('modelo').value.trim(),
            'matricula': document.querySelector('input[name="matricula"]:checked').value,
            // 'matricula': document.getElementById('matricula').value.trim(),
            'anho': document.getElementById('anho').value,
            'color': document.getElementById('color').value.trim(),
            'kilometraje': document.getElementById('kilometraje').value,
            'precio': document.getElementById('precio').value
        };

        if (document.getElementById('btnGuardar').value == 'Guardar') {
            Swal.fire({
                title: "¿Quieres guardar el registro?",
                text: "El registro se guardará",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Era bromita",
                confirmButtonText: "Obvio"
            }).then((result) => {
                if (result.isConfirmed) {
                    save(vehiculo)
                    Swal.fire({
                        title: "Guardado",
                        text: "Su registro se ha guardado",
                        icon: "success"
                    })
                    limpiar()
                }
            })
        } else {
            Swal.fire({
                title: "¿Quieres modificar el registro?",
                text: "El registro se modificará",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Era bromita",
                confirmButtonText: "Obvio"
            }).then((result) => {
                if (result.isConfirmed) {
                    update(id, vehiculo)
                    Swal.fire({
                        title: "Modificado",
                        text: "Su registro se ha modificado",
                        icon: "success"
                    })
                    limpiar()
                    id = 0
                }
            })
        }
    }
})


//DOMEventLister es un evento que se ejecuta cuando se recarga la página 
window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        //se recorre la colección y se crear el item doc para mostrar los datos
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.marca}</td>
            <td>${item.modelo}</td>
            <td>${item.matricula}</td>
            <td>${item.anho}</td>
            <td>${item.color}</td>
            <td>${item.kilometraje}</td>
            <td>${item.precio}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botón y eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Quieres eliminar el registro?",
                    text: "El registro se eliminará",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    cancelButtonText: "Era bromita",
                    confirmButtonText: "Obvio"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //añadir sweetalert para confirmar la eliminación
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro se ha eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        //seleccionar el documento
        document.querySelectorAll('.btn-warning').forEach( btn => {
            //async indica que necesitamos un await para esperar a que la función responda
            btn.addEventListener('click',async() =>{
                //invocar función para buscar el documento por su id
                const doc = await obtener(btn.id)
                //obtener los valores del documento
                const d = doc.data()
                //asignar los valores a los input
                document.getElementById('marca').value = d.marca
                document.getElementById('modelo').value = d.modelo
                // Asignar el valor al botón de opción correcto
                document.querySelector(`input[name="matricula"][value="${d.matricula}"]`).checked = true;
                document.getElementById('anho').value = d.anho
                document.getElementById('color').value = d.color
                document.getElementById('kilometraje').value = d.kilometraje
                document.getElementById('precio').value = d.precio
                //modificar el valor del botón 
                document.getElementById('btnGuardar').value = 'Modificar'
                //asignar el id del documento a nuestra variable
                id = btn.id
            })
        })
    })
})