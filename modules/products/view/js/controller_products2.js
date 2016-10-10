
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

        /*
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
        */
    });//each
    return this;

};//function ends

//Solution to : "Uncaught Error: Dropzone already attached."
Dropzone.autoDiscover = false;
$(document).ready(function(){

  console.log("entra a ready");

    $(function() {
      $('#date_reception').datepicker({
          dateFormat: 'dd/mm/yy'
      });
    });

    $(function() {
      $('#date_expiration').datepicker({
          dateFormat: 'dd/mm/yy'
      });
    });


    $('#SubmitProducts').click(function(){
      validate_products();
    });

    //Control de seguridad para evitar que al volver atrás de la pantalla results a create, no nos imprima los datos
    $.get("modules/products/controller/controller_products.class.php?load_data=true",
          function(response){

              if (response.products === "") {
                  $("#name").val('');
                  $("#ident").val('');
                  /*$("#description").val('');
                  $("#quantity").val('');
                  $("#price").val('');
                  $("#country").val('Select level');
                  $("#province").val('Select level');
                  $("#location").val('Select level');
                  $("#date_reception").val('');
                  $("#date_expiration").val('');
                  var inputElements = document.getElementsByClassName('pCheckbox');
                  for (var i = 0; i < inputElements.length; i++) {
                      if (inputElements[i].checked) {
                          inputElements[i].checked = false;
                      }
                  }*/
                  $(this).fill_or_clean();
              } else {
                  $("#name").val(response.products.name);
                  $("#ident").val(response.products.ident);
                  /*$("#description").val(response.products.description);
                  $("#quantity").val(response.products.quantity);
                  $("#price").val(response.products.price);
                  $("#country").val(response.products.country);
                  $("#province").val(response.products.province);
                  $("#location").val(response.products.location);
                  $("#date_reception").val('');
                  $("#date_expiration").val('');
                  var inputsElements = document.getElementsByClassName('pCheckbox');
                  for (var j = 0; j < inputsElements.length; j++) {
                      if (inputsElements[j].checked) {
                          inputsElements[j].checked = false;
                      }
                  }*/
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

              console.log(response);

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
                  //var json = JSON.parse(data);

                  console.log(data);
                  /*
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
                  */
              }
          });
      },
    });///END Dropzone function




    //siempre que creemos un plugin debemos llamarlo, sino no funcionará
    //$(this).fill_or_clean();

    ///patterns////
    var name_reg = /^[0-9a-zA-ZñÑ\\s]{2,30}$/;
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

    /*$("#description").keyup(function () {
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
    });//END functions keyup


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
    });*/

});

function validate_products() {
   var result = true;

   //var name = document.getElementById('product_name').value;

   var name = document.getElementById('name').value;
   var ident = document.getElementById('ident').value;
   /*var description= document.getElementById('description').value;
   var quantity = document.getElementById('quantity').value;
   var price = document.getElementById('price').value;
   var country = document.getElementById('country').value;
   var province = document.getElementById('province').value;
   var location = document.getElementById('location').value;
   var date_reception= document.getElementById('date_reception').value;
   var date_expiration= document.getElementById('date_expiration').value;
   var colors = [];
   var inputElements = document.getElementsByClassName('pCheckbox');
   var j = 0;
   for (var i = 0; i < inputElements.length; i++) {
       if (inputElements[i].checked) {
           colors[j] = inputElements[i].value;
           j++;
       }
   }*/

   ////Patterns/////
   var name_reg = /^[0-9a-zA-ZñÑ\\s]{2,30}$/;
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
   /*
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

   if ($("#date_reception").val() === "" || $("#date_reception").val() === "Introduce date of reception") {
       $("#date_reception").focus().after("<span class='error'>Introduce date of reception</span>");
       return false;
   } else if (!date_reg.test($("#date_reception").val())) {
       $("#date_reception").focus().after("<span class='error'>error format date (dd/mm/yyyy)</span>");
       return false;
   }

   if ($("#date_expiration").val() === "" || $("#date_expiration").val() === "Introduce date of reception") {
       $("#date_expiration").focus().after("<span class='error'>Introduce date of expiration</span>");
       return false;
   } else if (!date_reg.test($("#date_expiration").val())) {
       $("#date_expiration").focus().after("<span class='error'>error format date (dd/mm/yyyy)</span>");
       return false;
   }*/

   console.log("Antes de que se envian los datos al servidor");

   if (result) {
     /*var data ={ "name": name, "ident": ident, "description": description, "quantity": quantity,
          "price": price, "country": country, "province": province, "location":location,
          "date_reception": date_reception, "date_expiration": date_expiration, "colors": colors};
          */

          var data = { "name": name , "ident": ident};
          var data_products_JSON =JSON.stringify(data);

          $.post('modules/products/controller/controller_products.class.php',
              {add_products_json: data_products_JSON},
              function(response) {
                console.log(response);

                /*if(response.success) {
                  window.location.href = response.redirect;
                }*/
              }, "json").fail(function (xhr){
                  console.log(xhr.responseJSON);
                  /*
                    if (xhr.responseJSON.error.name)
                        $("#name").focus.after("<span class'error1'>" + xhr.responseJSON.error.name + "</span>");

                    if (xhr.responseJSON.error.ident)
                        $("#ident").focus.after("<span class'error1'>" + xhr.responseJSON.error.ident + "</span>");

                    if (xhr.responseJSON.error.description)
                        $("#description").focus.after("<span class'error1'>" + xhr.responseJSON.error.description + "</span>");

                    if (xhr.responseJSON.error.quantity)
                        $("#quantity").focus.after("<span class'error1'>" + xhr.responseJSON.error.quantity + "</span>");

                    if (xhr.responseJSON.error.price)
                        $("#price").focus.after("<span class'error1'>" + xhr.responseJSON.error.price + "</span>");

                    if (xhr.responseJSON.error.colors)
                        $("#colors").focus.after("<span class'error1'>" + xhr.responseJSON.error.colors + "</span>");

                    if (xhr.responseJSON.error.country)
                        $("#country").focus.after("<span class'error1'>" + xhr.responseJSON.error.country + "</span>");

                    if (xhr.responseJSON.error.province)
                        $("#province").focus.after("<span class'error1'>" + xhr.responseJSON.error.province + "</span>");

                    if (xhr.responseJSON.error.location)
                        $("#location").focus.after("<span class'error1'>" + xhr.responseJSON.error.location + "</span>");

                    if (xhr.responseJSON.error.date_reception)
                        $("#date_reception").focus.after("<span class'error1'>" + xhr.responseJSON.error.date_reception + "</span>");

                    if (xhr.responseJSON.error.date_expiration)
                        $("#date_expiration").focus.after("<span class'error1'>" + xhr.responseJSON.error.date_expiration + "</span>");

                    if (xhr.responseJSON.error_avatar)
                        $("#dropzone").focus.after("<span class'error1'>" + xhr.responseJSON.error_avatar + "</span>");

                    if (xhr.responseJSON.success1){
                        if (xhr.responseJSON.img_avatar !== "/php_mvc_products/media/default-avatar.png"){

                        }else{
                          $("#progress").hide();
                          $('.msg').text('').removeClass('msg_ok');
                          $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'right': '300px'}, 300);
                        }
                    }*/
              }); //END fail



   }


}
