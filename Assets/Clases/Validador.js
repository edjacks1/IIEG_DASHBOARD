class Validador {

  constructor(formulario, reglas_de_validacion, mensajes_de_validacion) {
    this.formulario                                = formulario;
    this.reglas_de_validacion                      = reglas_de_validacion;
    this.mensajes_de_validacion                    = mensajes_de_validacion;
  }

  general(funcion_por_si_se_cumple_la_validacion){

      $(this.formulario).validate({
          submitHandler: function(formulario) { funcion_por_si_se_cumple_la_validacion(formulario) },
          errorElement: "em",
          errorPlacement: function(error, element) {
            $(element.parent("div").addClass("form-animate-error"));
            error.appendTo(element.parent("div"));
          },
          success: function(label) {
            $(label.parent("div").removeClass("form-animate-error"));
          },
          rules   : this.reglas_de_validacion ,
          messages: this.mensajes_de_validacion
      });

  }

}
