class Peticiones_Fetch {

  constructor(url, datos, metodo = 'POST') {
    this.url    = url;
    this.datos  = datos;
    this.metodo = metodo;
  }

  general(){

     fetch(this.url, {
         headers     : {"X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')},
         method      : this.metodo,
         credentials : "same-origin",
         body        : this.datos,
     })
     .then(respuesta => respuesta.json() )
     .then(function(respuesta) {

        let instancia_alertas = new Alertas(respuesta['TITULO'],respuesta['MENSAJE']);

        if (respuesta['BANDERA']) {
          variable_datatable.clear().destroy();
          datatable_data();
          instancia_alertas.general('success');
        }else{
          instancia_alertas.general('error');
        }

     })
     .catch(function(error){
       console.log(error);
       let instancia_alertas = new Alertas('Error en el servicor',"Ha ocurrido un error en el servidor");
       instancia_alertas.general('error');
     });

  }

}
