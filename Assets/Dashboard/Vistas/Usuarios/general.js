let variable_datatable;
let datatable_temp;

jQuery(document).ready(function($) {
    // datatable_data();
    $('#datataTable').DataTable();

    // $('.Select2').select2({
    //       placeholder: "Elije el producto",
    //       allowClear: true,
    // });

    $('#modal-editar').on('show.bs.modal', function(event) {

        let boton = $(event.relatedTarget);

        $('#modal-editar div.modal-dialog div.modal-content div.modal-header div.modal-title span').text(boton.data('nombre'));

        $('#form_editar input[  name="nombre"    ]'    ).val( boton.data('nombre'    ));
        $('#form_editar input[  name="email"     ]'    ).val( boton.data('email'     ));
        $('#form_editar input[  name="password"  ]'    ).val( boton.data('password'  ));
    });


});

// function datatable_data(){
//   datos = JSON.parse( '[{"data": "id"},'                                         +
//                       '{"data":  "nombre"},'                                     +
//                       '{"data":  "ubicacion"},'                                  +
//                       '{"data":  "opciones"}]');
//
//   let instancia_datatable = new Datatable_personalizada('datatable_almacenes',datos);
//   variable_datatable      = instancia_datatable.serverSide(function(){});
// }

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
              nombre    :   {required :true, maxlength: 200 },
              email     :  {required :true, minlength: 5, maxlength: 200, email: true },
              password  :  {required :false,minlength: 5 },

           };
}
function obtenerMensajes() {
    return {
              nombre  :   {required :'Ingrese sus nombres',   maxlength: 'El tamaño de los nombres no puede ser mas de 200 caracteres' },
              email   :   {required :'Ingrese su email',      minlength: 'El tamaño del email debe ser mas de 5 caracteres' },
              password:   {required :'Ingrese su contraseña', minlength: 'El tamaño de la contraseña debe contener mas de 5 caracteres' },
           };
}
function obtenerFuncion() {
    return  function(form){
                let datos = new FormData(form);
                // let instancia_peticion = new Peticiones_Fetch(ruta,datos);
                // instancia_peticion.general();
            }
}
