////////////////////////////////////////////////////////////////
function load_prd_ajax() {

    $.ajax({
        type: 'GET',
        url: "modules/products/controller/controller_products.class.php?load=true",
        //dataType: 'json',
        async: false
    }).success(function (data) {
      //console.log(data);
        var json = JSON.parse(data);

        //alert(json.user.usuario);

        pintar_products(json);

    }).fail(function (xhr) {
        alert(xhr.responseText);
    });
}
/*
////////////////////////////////////////////////////////////////
function load_users_get_v1() {
    $.get("modules/users/controller/controller_users.class.php?load=true", function (data, status) {
        var json = JSON.parse(data);
        //$( "#content" ).html( json.msje );
        //alert("Data: " + json.user.usuario + "\nStatus: " + status);

        pintar_user(json);
    });
}

////////////////////////////////////////////////////////////////
function load_users_get_v2() {
    var jqxhr = $.get("modules/users/controller/controller_users.class.php?load=true", function (data) {
        var json = JSON.parse(data);
        console.log(json);
        pintar_user(json);
        //alert( "success" );
    }).done(function () {
        //alert( "second success" );
    }).fail(function () {
        //alert( "error" );
    }).always(function () {
        //alert( "finished" );
    });

    jqxhr.always(function () {
        //alert( "second finished" );
    });
}*/

$(document).ready(function () {
    load_prd_ajax();
    //load_users_get_v1();
    //load_users_get_v2();
});

function pintar_products(data) {
    //alert(data.user.avatar);
    var content = document.getElementById("content");
    var div_prd = document.createElement("div");
    var parrafo = document.createElement("p");

    var msg = document.createElement("div");
    //msg.innerHTML = "Mensaje = ";
    msg.innerHTML += data.msg;

    var name = document.createElement("div");
    name.innerHTML = "name = ";
    name.innerHTML += data.prd.name;

    var ident = document.createElement("div");
    ident.innerHTML = "ident = ";
    ident.innerHTML += data.prd.ident;

    var description = document.createElement("div");
    description.innerHTML = "description = ";
    description.innerHTML += data.prd.description;

    var quantity = document.createElement("div");
    quantity.innerHTML = "quantity = ";
    quantity.innerHTML += data.prd.quantity;

    var price = document.createElement("div");
    price.innerHTML = "price = ";
    price.innerHTML += data.prd.price;

    var colors = document.createElement("div");
    colors.innerHTML = "colors = ";
    for(var i =0;i < data.prd.colors.length;i++){
    colors.innerHTML += " - "+data.prd.colors[i];
    }

    var gender = document.createElement("div");
    gender.innerHTML = "gender = ";
    gender.innerHTML += data.prd.gender;

    var country = document.createElement("div");
    country.innerHTML = "country = ";
    country.innerHTML += data.prd.country;

    var province = document.createElement("div");
    province.innerHTML = "province = ";
    province.innerHTML += data.prd.province;

    var location = document.createElement("div");
    location.innerHTML = "location = ";
    location.innerHTML += data.prd.location;

    var date_reception = document.createElement("div");
    date_reception.innerHTML = "date_reception = ";
    date_reception.innerHTML += data.prd.date_reception;

    var date_expiration = document.createElement("div");
    date_expiration.innerHTML = "date_expiration = ";
    date_expiration.innerHTML += data.prd.date_expiration;

    //arreglar ruta IMATGE!!!!!

    var cad = data.prd.img_icon;
    console.log(cad);
    //var cad = cad.toLowerCase();
    var img = document.createElement("div");
    var html = '<img src="' + cad + '" height="75" width="75"> ';
    console.log(html);
    img.innerHTML = html;
    //alert(html);

    div_prd.appendChild(parrafo);
    parrafo.appendChild(msg);
    parrafo.appendChild(name);
    parrafo.appendChild(ident);
    parrafo.appendChild(description);
    parrafo.appendChild(quantity);
    parrafo.appendChild(price);
    parrafo.appendChild(colors);
    parrafo.appendChild(gender);
    parrafo.appendChild(country);
    parrafo.appendChild(province);
    parrafo.appendChild(location);
    parrafo.appendChild(date_reception);
    parrafo.appendChild(date_expiration);
    content.appendChild(div_prd);
    content.appendChild(img);
}
