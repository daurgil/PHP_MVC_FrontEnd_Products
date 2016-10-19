
jQuery.fn.fill_or_clean= function(){

    this.each(function(){
        if ($("#name").val() === "") {
            $("#name").val("Introduce name");
            $("#name").focus(function () {
                if ($("#name").val() === "Introduce name") {
                    $("#name").val("");
                }
            });
        }
        $("#name").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#name").val() === "") {
                $("#name").val("Introduce name");
            }
        });

        if ($("#ident").val() === "") {
            $("#ident").val("Introduce id");
            $("#ident").focus(function () {
                if ($("#ident").val() === "Introduce id") {
                    $("#ident").val("");
                }
            });
        }
        $("#ident").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#ident").val() === "") {
                $("#ident").val("Introduce id");
            }
        });

        if ($("#description").val() === "") {
            $("#description").val("Introduce description");
            $("#description").focus(function () {
                if ($("#description").val() === "Introduce description") {
                    $("#description").val("");
                }
            });
        }
        $("#description").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#description").val() === "") {
                $("#description").val("Introduce description");
            }
        });


        if ($("#quantity").val() === "") {
            $("#quantity").val("Introduce quantity");
            $("#quantity").focus(function () {
                if ($("#quantity").val() === "Introduce quantity") {
                    $("#quantity").val("");
                }
            });
        }
        $("#quantity").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#").val() === "") {
                $("#quantity").val("Introduce quantity");
            }
        });

        if ($("#price").val() === "") {
            $("#price").val("Introduce price");
            $("#price").focus(function () {
                if ($("#price").val() === "Introduce price") {
                    $("#price").val("");
                }
            });
        }
        $("#price").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#").val() === "") {
                $("#price").val("Introduce price");
            }
        });

        if ($("#date_reception").val() === "") {
            $("#date_reception").val("Introduce date");
            $("#date_reception").focus(function () {
                if ($("#date_reception").val() === "Introduce date") {
                    $("#date_reception").val("");
                }
            });
        }
        $("#date_reception").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#date_reception").val() === "") {
                $("#date_reception").val("Introduce date");
            }
        });


        if ($("#date_expiration").val() === "") {
            $("#date_expiration").val("Introduce date");
            $("#date_expiration").focus(function () {
                if ($("#date_expiration").val() === "Introduce date") {
                    $("#date_expiration").val("");
                }
            });
        }
        $("#date_expiration").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#date_expiration").val() === "") {
                $("#date_expiration").val("Introduce date");
            }
        });


    });//each
    return this;

};//function ends

//Solution to : "Uncaught Error: Dropzone already attached."
Dropzone.autoDiscover = false;
$(document).ready(function(){

    $(function() {
      $('#date_reception').datepicker({
          dateFormat: 'dd/mm/yy',
          changeMonth:true, changeYear:true,
          minDate: -90, maxDate: "+1M"
      });
    });

    $(function() {
      $('#date_expiration').datepicker({
          dateFormat: 'dd/mm/yy',
          changeMonth:true, changeYear:true,
          minDate: 0, maxDate: "+36M"
      });
    });

    $('#SubmitProducts').click(function(){
      validate_products();
    });

    //Control de seguridad para evitar que al volver atrás de la pantalla results a create, no nos imprima los datos
    $.get("modules/products/controller/controller_products.class.php?load_data=true",
          function(response){

              if (response.prd === "") {
                  $("#name").val('');
                  $("#ident").val('');
                  $("#description").val('');
                  $("#quantity").val('');
                  $("#price").val('');
                  var inputGenderB = document.getElementsByClassName('gender');
                  for (var j = 0; j < inputGenderB.length; j++) {
                      if (j === 0) {
                          inputGenderB[j].checked = true;
                      }
                  }
                  $("#country").val('Select option');
                  $("#province").val('Select option');
                  $("#location").val('Select option');
                  $("#date_reception").val('');
                  $("#date_expiration").val('');
                  var inputColorsB = document.getElementsByClassName('colors');
                  for (var i = 0; i < inputColorsB.length; i++) {
                      if (inputColorsB[i].checked) {
                          inputColorsB[i].checked = false;
                      }
                  }
                  $(this).fill_or_clean();
              } else {
                  $("#name").val(response.prd.name);
                  $("#ident").val(response.prd.ident);
                  $("#description").val(response.prd.description);
                  $("#quantity").val(response.prd.quantity);
                  $("#price").val(response.prd.price);
                  var gender = response.prd.gender;
                  var inputGender = document.getElementsByClassName('gender');
                    for (var f = 0; f < gender.length; f++) {
                        for (var h = 0; h < inputGender.length; h++) {
                            if(gender[f] ===inputGender[h] )
                                inputGender[h].checked = true;
                        }
                    }
                  $("#country").val(response.prd.country);
                  $("#province").val(response.prd.province);
                  $("#location").val(response.prd.location);
                  $("#date_reception").val('');
                  $("#date_expiration").val('');
                  var colors = response.prd.colors;
                  var inputColors = document.getElementsByClassName('colors');
                    for (var k = 0; k < colors.length; k++) {
                        for (var q = 0; q < inputElements.length; q++) {
                            if(colors[k] ===inputColors[q] )
                                inputColors[q].checked = true;
                        }
                    }
              }
          }, "json");

    ////////////Dropzone function////////////////////////////////
    $("#dropzone").dropzone({
      url: "modules/products/controller/controller_products.class.php?upload=true",
      addRemoveLinks: true,
      maxFileSize: 1000,
      dictResponseError: "Ha ocurrido un error en el server",
      acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
      init: function() {
          this.on("success", function (file, response){

              //console.log(response);

              $("#progress").show();
              $("#bar").width('100%');
              $("#percent").html('100%');
              $('.msg').text('').removeClass('msg_error');
              $('.msg').text('Success Upload image').addClass('msg_ok').animate({'right': '300px'}, 300);

          });
      },

      complete: function(file) {

      },

      error: function (file){

      },

      removedfile: function(file, serverFileName){
          var name = file.name;
          $.ajax({
              type: "POST",
              url: "modules/products/controller/controller_products.class.php?delete=true",
              data: "filename=" + name,
              success: function (data) {
                  $("#progress").hide();
                  $('.msg').text('').removeClass('msg_ok');
                  $('.msg').text('').removeClass('msg_error');
                  $("#e_avatar").html("");

                  var element;
                  var json = JSON.parse(data);

                  //console.log(data);

                  if (json.res === true) {
                      //var element;
                      if ((element = file.previewElement) !== null) {
                        element.parentNode.removeChild(file.previewElement);
                      } else {
                        return false;
                      }
                  } else { //json.res == false, elimino la imagen de todas formas
                      //var element;
                      if ((element = file.previewElement) !== null) {
                          element.parentNode.removeChild(file.previewElement);
                      } else {
                          return false;
                      }
                  }

              }
          });
      },
    });///END Dropzone function



    ///patterns////
    var name_reg = /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/;
    var number_reg= /^([0-9])*$/;
    var price_reg=/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
    var date_reg = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;
    var string_reg = /[0-9a-zA-ZñÑ\\s]{2,250}$/;

    //Funciones para hacer mas practico el formulario
    $("#name").keyup(function () {
        if($(this).val() !== "" && name_reg.test($(this).val())){
          $(".error").fadeOut();
          return false;
        }
    });

    $("#ident").keyup(function () {
        if($(this).val() !== "" && number_reg.test($(this).val())){
          $(".error").fadeOut();
          return false;
        }
    });

    $("#description").keyup(function () {
        if($(this).val() !== "" && string_reg.test($(this).val())){
          $(".error").fadeOut();
          return false;
        }
    });

    $("#quantity").keyup(function () {
        if($(this).val() !== "" && number_reg.test($(this).val())){
          $(".error").fadeOut();
          return false;
        }
    });

    $("#price").keyup(function () {
        if($(this).val() !== "" && price_reg.test($(this).val())){
          $(".error").fadeOut();
          return false;
        }
    });

    $("#date_reception, #date_expiration").keyup(function () {
        if ($(this).val() !== "" && date_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });

    load_countries_v1();
    $("#province").empty();
    $("#province").append('<option value="" selected="selected">Selecciona una provincia</option>');
    $("#province").prop('disabled', true);
    $("#location").empty();
    $("#location").append('<option value="" selected="selected">Selecciona una Poblacion</option>');
    $("#location").prop('disabled', true);

    $("#country").change(function() {
		var country = $(this).val();
		var province = $("#province");
		var location = $("#location");

		if(country !== 'ES'){
	         province.prop('disabled', true);
	         location.prop('disabled', true);
	         $("#province").empty();
		     $("#location").empty();
		}else{
	         province.prop('disabled', false);
	         location.prop('disabled', false);
	         load_provincias_v1();
		}//fi else
	});

	$("#province").change(function() {
		var prov = $(this).val();
		if(prov > 0){
			load_poblaciones_v1(prov);
		}else{
			$("#location").prop('disabled', false);
		}
	});
    //END functions keyup

});

function validate_products() {
   var result = true;


   var name = document.getElementById('name').value;
   var ident = document.getElementById('ident').value;
   var description= document.getElementById('description').value;
   var quantity = document.getElementById('quantity').value;
   var price = document.getElementById('price').value;
   var country = document.getElementById('country').value;
   var province = document.getElementById('province').value;
   var location = document.getElementById('location').value;
   var date_reception= document.getElementById('date_reception').value;
   var date_expiration= document.getElementById('date_expiration').value;
   var gender = $('input[name="gender"]:checked').val();
   var colors = [];
   var inputCheck = document.getElementsByClassName('colors');
   var k = 0;
   for (var h = 0; h < inputCheck.length; h++) {
       if (inputCheck[h].checked) {
           colors[k] = inputCheck[h].value;
           k++;
       }
    }

   ////Patterns/////
   var name_reg = /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/;
   var number_reg= /^([0-9])*$/;
   var price_reg=/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
   var date_reg = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;
   var string_reg = /[0-9a-zA-ZñÑ\\s]{2,250}$/;

   $(".error").remove();

   if ($("#name").val() === "" || $("#name").val() === "Introduce name"){
       $("#name").focus().after("<span class='error'>Introduce name</span>");
       return false;
   }else if(!name_reg.test($("#name").val())){
       $("#name").focus().after("<span class='error'>Name must be 2 to 30 letters</span>");
       return false;
   }

   if ($("#ident").val() === "" || $("#ident").val() === "Introduce id"){
       $("#ident").focus().after("<span class='error'>Introduce id</span>");
       return false;
   }else if(!number_reg.test($("#ident").val())){
       $("#ident").focus().after("<span class='error'>Need be a number</span>");
       return false;
   }

   if ($("#description").val() === "" || $("#description").val() === "Introduce description"){
       $("#description").focus().after("<span class='error'>Introduce description</span>");
       return false;
   }else if(!string_reg.test($("#description").val())){
       $("#description").focus().after("<span class='error'>Introduce between 1-250 characters</span>");
       return false;
   }

   if ($("#quantity").val() === "" || $("#quantity").val() === "Introduce quantity"){
       $("#quantity").focus().after("<span class='error'>Introduce quantity</span>");
       return false;
   }else if(!number_reg.test($("#quantity").val())){
       $("#quantity").focus().after("<span class='error'>Need be a number</span>");
       return false;
   }

   if ($("#price").val() === "" || $("#price").val() === "Introduce price"){
       $("#price").focus().after("<span class='error'>Introduce price</span>");
       return false;
   }else if(!price_reg.test($("#price").val())){
       $("#price").focus().after("<span class='error'>Need be a number</span>");
       return false;
   }

   if ($("#country").val() === "" || $("#country").val() === "Select country") {
       $("#country").focus().after("<span class='error'>Select an option</span>");
       return false;
   }

   if ($("#province").val() === "" || $("#province").val() === "Select province") {
       $("#province").focus().after("<span class='error'>Select an option</span>");
       return false;
   }

   if ($("#location").val() === "" || $("#location").val() === "Select location") {
       $("#location").focus().after("<span class='error'>Select an option</span>");
       return false;
   }

   if ($("#date_reception").val() === "" || $("#date_reception").val() === "Introduce date of reception") {
       $("#date_reception").focus().after("<span class='error'>Introduce date of reception</span>");
       return false;
   } else if (!date_reg.test($("#date_reception").val())) {
       $("#date_reception").focus().after("<span class='error'>error format date (dd/mm/yyyy)</span>");
       return false;
   }

   if ($("#date_expiration").val() === "" || $("#date_expiration").val() === "Introduce date of expiration") {
       $("#date_expiration").focus().after("<span class='error'>Introduce date of expiration</span>");
       return false;
   } else if (!date_reg.test($("#date_expiration").val())) {
       $("#date_expiration").focus().after("<span class='error'>error format date (dd/mm/yyyy)</span>");
       return false;
   }




   console.log("Antes de que se envian los datos al servidor");

   if (result) {

         if (province === null) {
             province = 'default_province';
         }else if (province.length === 0) {
             province = 'default_province';
         }else if (province === 'Select province') {
             return 'default_province';
         }

         if (location === null) {
             location = 'default_poblacion';
         }else if (location.length === 0) {
             location = 'default_poblacion';
         }else if (location === 'Select location') {
             return 'default_location';
         }

          var data = { "name": name, "ident": ident, "description": description, "quantity": quantity,
               "price": price,"colors": colors, "gender": gender, "country": country, "province": province,
                "location":location, "date_reception": date_reception, "date_expiration": date_expiration};

          var data_products_JSON =JSON.stringify(data);

          $.post('modules/products/controller/controller_products.class.php',
              {add_products_json: data_products_JSON},
              function(response) {
                console.log(response);
                //console.log(response.colors);
                if(response.success) {
                  window.location.href = response.redirect;
                }
              }, "json").fail(function (xhr){
                  //console.log(xhr);
                  if (xhr.responseJSON.error.name)
                      $("#e_name").focus().after("<span class'error1'>" + xhr.responseJSON.error.name + "</span>");

                  if (xhr.responseJSON.error.ident)
                      $("#e_ident").focus().after("<span class'error1'>" + xhr.responseJSON.error.ident + "</span>");

                  if (xhr.responseJSON.error.description)
                      $("#e_description").focus().after("<span class'error1'>" + xhr.responseJSON.error.description + "</span>");

                  if (xhr.responseJSON.error.quantity)
                      $("#e_quantity").focus().after("<span class'error1'>" + xhr.responseJSON.error.quantity + "</span>");

                  if (xhr.responseJSON.error.price)
                      $("#e_price").focus().after("<span class'error1'>" + xhr.responseJSON.error.price + "</span>");

                  if (xhr.responseJSON.error.colors)
                      $("#e_colors").focus().after("<span class'error1'>" + xhr.responseJSON.error.colors + "</span>");

                  if (xhr.responseJSON.error.country)
                      $("#country").focus().after("<span class'error1'>" + xhr.responseJSON.error.country + "</span>");

                  if (xhr.responseJSON.error.province)
                      $("#e_province").focus().after("<span class'error1'>" + xhr.responseJSON.error.province + "</span>");

                  if (xhr.responseJSON.error.location)
                      $("#e_location").focus().after("<span class'error1'>" + xhr.responseJSON.error.location + "</span>");

                  if (xhr.responseJSON.error.date_reception)
                      $("#e_date_reception").focus().after("<span class'error1'>" + xhr.responseJSON.error.date_reception + "</span>");

                  if (xhr.responseJSON.error.date_expiration)
                      $("#e_date_expiration").focus().after("<span class'error1'>" + xhr.responseJSON.error.date_expiration + "</span>");

                  if (xhr.responseJSON.error_img)
                      $("#dropzone").focus().after("<span class'error1'>" + xhr.responseJSON.error_avatar + "</span>");

                  if (xhr.responseJSON.success1){
                      if (xhr.responseJSON.img_icon !== "/php_mvc_products/media/default-avatar.png"){

                      }else{
                        $("#progress").hide();
                        $('.msg').text('').removeClass('msg_ok');
                        $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'right': '300px'}, 300);
                      }
                  }
              }); //END fail
   }

}///END validate_products

function load_countries_v2(cad) {
    $.getJSON( cad, function(data) {
      $("#country").empty();
      $("#country").append('<option value="" selected="selected">Select country</option>');
      
      $.each(data, function (i, valor) {
        $("#country").append("<option value='" + valor.sISOCode + "'>" + valor.sName + "</option>");
      });
    })
    .fail(function() {
        alert( "error load_countries" );
    });
}

function load_countries_v1() {
    $.get( "modules/products/controller/controller_products.class.php?load_country=true",
        function( response ) {
            //console.log(response);
            if(response === 'error'){
                load_countries_v2("resources/ListOfCountryNamesByName.json");
            }else{

                load_countries_v2("modules/products/controller/controller_products.class.php?load_country=true"); //oorsprong.org
            }
    })
    .fail(function(response) {

        load_countries_v2("resources/ListOfCountryNamesByName.json");
    });
}

function load_provincias_v2() {
  console.log("province2");
    $.get("resources/provinciasypoblaciones.xml", function (xml) {
	    $("#province").empty();
	    $("#province").append('<option value="" selected="selected">Select province</option>');

        $(xml).find("provincia").each(function () {
            var id = $(this).attr('id');
            var nombre = $(this).find('nombre').text();
            $("#province").append("<option value='" + id + "'>" + nombre + "</option>");
        });
    })
    .fail(function() {
        alert( "error load_provincias" );
    });
}

function load_provincias_v1() { //provinciasypoblaciones.xml - xpath
  console.log("province1");
    $.get( "modules/products/controller/controller_products.class.php?load_provinces=true",
        function( response ) {
            $("#province").empty();
	        $("#province").append('<option value="" selected="selected">Select province</option>');

            //alert(response);
            var json = JSON.parse(response);
		        var provinces=json.provincias;
		    //alert(provincias);
		    //console.log(provincias);

		    //alert(provincias[0].id);
		    //alert(provincias[0].nombre);

            if(provinces === 'error'){
                load_provincias_v2();
            }else{
                for (var i = 0; i < provinces.length; i++) {
        		    $("#province").append("<option value='" + provinces[i].id + "'>" + provinces[i].nombre + "</option>");
    		    }
            }
    })
    .fail(function(response) {
        load_provincias_v2();
    });
}

function load_poblaciones_v2(prov) {
  console.log("location2");
    $.get("resources/provinciasypoblaciones.xml", function (xml) {
		$("#location").empty();
	    $("#location").append('<option value="" selected="selected">Select location</option>');

		$(xml).find('provincia[id=' + prov + ']').each(function(){
    		$(this).find('localidad').each(function(){
    			 $("#location").append("<option value='" + $(this).text() + "'>" + $(this).text() + "</option>");
    		});
        });
	})
	.fail(function() {
        alert( "error load_poblaciones" );
    });
}

function load_poblaciones_v1(prov) { //provinciasypoblaciones.xml - xpath
  console.log("location1");
    var datos = { idPoblac : prov  };
	$.post("modules/products/controller/controller_products.class.php", datos, function(response) {
	    //alert(response);
        var json = JSON.parse(response);
		var locations=json.poblaciones;
		//alert(poblaciones);
		//console.log(poblaciones);
		//alert(poblaciones[0].poblacion);

		$("#location").empty();
	    $("#location").append('<option value="" selected="selected">Select location</option>');

        if(locationes === 'error'){
            load_poblacions_v2(prov);
        }else{
            for (var i = 0; i < locations.length; i++) {
        		$("#location").append("<option value='" + locations[i].poblacion + "'>" + locations[i].poblacion + "</option>");
    		}
        }
	})
	.fail(function() {
        load_poblaciones_v2(prov);
    });
}
