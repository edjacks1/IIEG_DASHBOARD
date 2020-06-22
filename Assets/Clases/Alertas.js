class Alertas {

  constructor(titulo,mensaje) {
    this.titulo                    = titulo;
    this.mensaje                   = mensaje;
  }

  general(tipo_de_alerta){

    Swal.fire(
        this.titulo,
        this.mensaje,
        tipo_de_alerta,
    )

  }

  mensaje_de_confirmacion_de_peticion(url,datos){

    Swal.fire({
        title: '¿Estas seguro de '+ this.titulo + '?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3E3E3E',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, continuar'
    }).then((result) => {
        if (result.value) {
          let instancia_peticion = new Peticiones_Fetch(url,datos);
          instancia_peticion.general();
        }else{
          this.titulo = 'Has cancelado la acción: ' + this.titulo + '.';
          this.general('error');
        }
    })

  }

}
