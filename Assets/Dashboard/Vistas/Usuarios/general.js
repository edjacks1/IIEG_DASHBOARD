let variable_datatable;
let datatable_temp;
let datos_datatable_productos_asignados = JSON.parse( '[{"data": "nombre"},{"data": "pivot.cantidad"}]');;
let almacen_id = null;

jQuery(document).ready(function($) {
    datatable_data();

    $('.Select2').select2({
          placeholder: "Elije el producto",
          allowClear: true,
    });

    $('#modal-editar').on('show.bs.modal', function(event) {

        let boton = $(event.relatedTarget);

        $('#modal-editar div.modal-dialog div.modal-content div.modal-header div.modal-title span').text(boton.data('nombre'));

        $('#form_editar input[  name="nombre"         ]'    ).val( boton.data('nombre'             )    );
        $('#form_editar input[  name="ubicacion"      ]'    ).val( boton.data('ubicacion'          )    );
        $('#form_editar input[  name="ruta"           ]'    ).val( boton.data('ruta'               )    );
    });

    $('#modal-asignar-producto').on('show.bs.modal', function(event) {

        let boton      = $(event.relatedTarget);
            almacen_id = boton.data('id');
            document.getElementById("form_asignar-producto").reset();
        $('#form_asignar-producto input[ name="ruta"       ]' ).val( boton.data('ruta') );

    });

    $('#modal-mostrar-productos-asignados').on('show.bs.modal', function(event) {

        let boton = $(event.relatedTarget);

        $('#modal-mostrar-productos-asignados .modal-footer').addClass('hidden');

        if (datatable_temp != null) {
          datatable_temp.clear().destroy();
        }

        let instancia_datatable = new Datatable_personalizada(null,datos_datatable_productos_asignados,'.datatable');
        datatable_temp          = instancia_datatable.normal(boton.data('asignados'));
    });

});

function datatable_data(){
  datos = JSON.parse( '[{"data": "id"},'                                         +
                      '{"data":  "nombre"},'                                     +
                      '{"data":  "ubicacion"},'                                  +
                      '{"data":  "opciones"}]');

  let instancia_datatable = new Datatable_personalizada('datatable_almacenes',datos);
  variable_datatable      = instancia_datatable.serverSide(function(){});
}

$(function(){
  $('.formulario').each(function() {
      let instancia_validadora = new Validador($(this),obtenerReglas(),obtenerMensajes());
      instancia_validadora.general(obtenerFuncion());
  });

  $(".boton-modal").click(function(){
      $($(this)[0].parentElement.parentElement.childNodes[3].childNodes[1]).submit();
      return false;
  });

});

function obtenerReglas() {
    return {
              nombre            :   {required :true,maxlength: 150 },
              ubicacion         :   {required :true,maxlength: 150 },
              producto_id       :   {required :true},
              cantidad          :   {required :true,min:1},

           };
}
function obtenerMensajes() {
    return {
              nombre            :   {required :'Ingrese el nombre del almacen',     maxlength: 'El nombre del almacen debe ser menor a 150 letras' },
              ubicacion         :   {required :'Ingrese la ubicación del almacen',  maxlength: 'La ubicación del almacen debe ser menor a 150 letras' },
              producto_id       :   {required :'Seleccione un producto' },
              cantidad          :   {required :'Ingrese la cantidad', min: 'La cantidad debe ser mayor a 0' },
           };
}
function obtenerFuncion() {
    return  function(form){

                let ruta  = $("#" + form.id + ' input[name="ruta"]'  ).val();

                if(form.id  === 'form_asignar-producto'){
                   ruta += $("#" + form.id + ' select[name="producto_id"]'  ).val() + '/' + almacen_id;
                }

                let datos = new FormData($("#" +  form.id )[0]);
                let instancia_peticion = new Peticiones_Fetch(ruta,datos);
                instancia_peticion.general();
            }
}

function eliminar_registro(ruta) {
  let instancia_peticion = new Peticiones_Fetch(ruta,null,'DELETE');
  instancia_peticion.general();
}
