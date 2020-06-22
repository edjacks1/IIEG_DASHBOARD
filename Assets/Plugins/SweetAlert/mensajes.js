function mensaje_de_exito(mensaje) {
    Swal.fire(
        'Exito!',
        mensaje,
        'success'
    )
}

function mensaje_de_error(mensaje) {
    Swal.fire(
        'Algo salio mal!',
        mensaje,
        'error'
    )
}

function mensaje_de_control_de_registro(url,metodo,registro,accion){

  Swal.fire({
      title: '¿Estas seguro de '+ accion +' este registro?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3E3E3E',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ' + accion + ' ' + registro
  }).then((result) => {
      if (result.value) {
          peticion_por_ajax(url,metodo);
      }else{
        mensaje_de_error('Has cancelado la ' + accion + ' de un ' + registro);
      }
  })

}

function mensaje_de_redireccionamiento(url,mensaje,accion){

  Swal.fire({
      title: mensaje,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3E3E3E',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, ' + accion,
  }).then((result) => {
      if (result.value) {
          window.location.href = url;
      }
  })

}
