class Datatable_personalizada {

  constructor(url, datos, nombre_del_dataTable = '#datatable', metodo = 'POST') {
    this.url                           = url;
    this.datos                         = datos;
    this.nombre_del_dataTable          = nombre_del_dataTable;
    this.metodo                        = metodo;
  }

  serverSide(funcion_opcional_de_datatable){

    return $(this.nombre_del_dataTable ).DataTable({
            language  :  this.datatable_en_espanol() ,
            bDestroy  : true,
            serverSide: true,
            ajax      : {
                          url  : this.url,
                          type : this.metodo,
                          'beforeSend': function (request) {
                              request.setRequestHeader("X-CSRF-TOKEN", jQuery('meta[name="csrf-token"]').attr('content'));
                          }
                        },
            columns   : this.datos,
            drawCallback: function() { funcion_opcional_de_datatable() },
    });

  }

  normal(data){
    return $(this.nombre_del_dataTable).DataTable( {
                language: this.datatable_en_espanol(),
                data    : data,
                columns : this.datos,
            });
  }

  datatable_en_espanol(){
    return JSON.parse( '{"decimal"        : ""                               ,'  +
                        '"emptyTable"     : "No hay información"             ,'  +
                        '"info"           : ""                               ,'  +
                        '"InfoEmpty"      : ""                               ,'  +
                        '"sInfo"          : ""                               ,'  +
                        '"sInfoEmpty"     : ""                               ,'  +
                        '"infoFiltered"   : "(Filtrado de _MAX_ resultados)" ,'  +
                        '"infoPostFix"    : ""                               ,'  +
                        '"thousands"      : ","                              ,'  +
                        '"lengthMenu"     : "Mostrar _MENU_"                 ,'  +
                        '"loadingRecords" : "Cargando..."                    ,'  +
                        '"processing"     : "Procesando..."                  ,'  +
                        '"search"         : "Buscar:"                        ,'  +
                        '"zeroRecords"    : "Sin resultados encontrados"     ,'  +
                        '"paginate"       : { "first"    : "Primero"         ,'  +
                                              '"last"     : "Último"         ,'  +
                                              '"next"     : "Siguiente"      ,'  +
                                              '"previous" : "Anterior" }}');
  }



}
