function validate_search(search_value) {
    if (search_value.length > 0) {
        var regexp = /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/;
        return regexp.test(search_value);
    }
    return false;
}

function refresh() {
    $('.pagination').html = '';
    $('.pagination').val = '';
}

function search(keyword) {
//changes the url to avoid creating another different function

    var urlbase = "modules/products_frontend/controller/controller_products_frontend.class.php";
    if (!keyword){
        url = urlbase + "?num_pages=true";
    } else {
        url = urlbase + "?num_pages=true&keyword=" + keyword;
    }

    $.get(url, function (data, status) {
        var json = JSON.parse(data);
        var pages = json.pages;

        if (!keyword){
            url = urlbase;
        } else {
            url = urlbase + "?keyword=" + keyword;
        }

        $("#results").load(url);

        if (pages !== 0) {
            refresh();
            $(".pagination").bootpag({
                total: pages,
                page: 1,
                maxVisible: 5,
                next: 'next',
                prev: 'prev'
            }).on("page", function (e, num) {
                e.preventDefault();
                if (!keyword){
                    $("#results").load("modules/products_frontend/controller/controller_products_frontend.class.php", {'page_num': num});
                } else {
                    $("#results").load("modules/products_frontend/controller/controller_products_frontend.class.php", {'page_num': num, 'keyword': keyword});
                }
                reset();
            });
        } else {
            $("#results").load("modules/products_frontend/controller/controller_products_frontend.class.php?view_error=false"); //view_error=false
            $('.pagination').html('');
            reset();
        }
        reset();

    }).fail(function (xhr) {
        $("#results").load("modules/products/controller/controller_products.class.php?view_error=true");
        $('.pagination').html('');
        reset();
    });
}

function search_product(keyword) {
    $.get("modules/products_frontend/controller/controller_products_frontend.class.php?nom_product=" + keyword, function (data, status) {
        var json = JSON.parse(data);
        var product = json.product_autocomplete;


        $('#results').html('');
        $('.pagination').html('');

        var img_product = document.getElementById('img_prod');
        img_prod.innerHTML = '<img src="' + product[0].img_icon + '" class="img-product"> ';

        var nom_product = document.getElementById('name_prod');
        nom_product.innerHTML = product[0].name;
        var desc_product = document.getElementById('description_prod');
        desc_product.innerHTML = product[0].description;
        var price_product = document.getElementById('price_prod');
        price_product.innerHTML = "Precio: " + product[0].price + " €";
        price_product.setAttribute("class", "special");

    }).fail(function (xhr) {
      console.log("error");
        $("#results").load("modules/products_frontend/controller/controller_products_frontend.class.php?view_error=false");
        $('.pagination').html('');
        reset();
    });
}

function count_product(keyword) {
    $.get("modules/products_frontend/controller/controller_products_frontend.class.php?count_product=" + keyword, function (data, status) {
        var json = JSON.parse(data);
        var num_products = json.num_products;
        //alert("num_products: " + num_products);

        if (num_products == 0) {
            $("#results").load("modules/products_frontend/controller/controller_products_frontend.class.php?view_error=false"); //view_error=false
            $('.pagination').html('');
            reset();
        }
        if (num_products == 1) {
            search_product(keyword);
        }
        if (num_products > 1) {
            search(keyword);
        }
    }).fail(function () {
        $("#results").load("modules/products_frontend/controller/controller_products_frontend.class.php?view_error=true"); //view_error=false
        $('.pagination').html('');
        reset();
    });
}
function reset() {
    $('#img_prod').html('');
    $('#name_prod').html('');
    $('#description_prod').html('');
    $('#price_prod').html('');
    $('#price_prod').removeClass("special");

    $('#keyword').val('');
}

$(document).ready(function () {
  if (getCookie("search")) {
      var keyword=getCookie("search");
      count_product(keyword);
      //alert("carrega pagina getCookie(search): " + getCookie("search"));
     //("#keyword").val(keyword) if we don't use refresh(), this way we could show the search param
      setCookie("search","",1);
  } else {
      search();
  }

  $("#search_prod").submit(function (e) {
      var keyword = document.getElementById('keyword').value;
      console.log(keyword);
      var validate_keyword = validate_search(keyword);
      if (validate_keyword)
          setCookie("search", keyword, 1);
      //alert("getCookie(search): " + getCookie("search"));
      location.reload(true);


      //si no ponemos la siguiente línea, el navegador nos redirecciona a index.php
      e.preventDefault(); //STOP default action
  });

  $('#Submit').click(function () {
      var keyword = document.getElementById('keyword').value;
      var validate_keyword = validate_search(keyword);
      if (validate_keyword)
          setCookie("search", keyword, 1);
      //alert("getCookie(search): " + getCookie("search"));
      location.reload(true);

  });

    $.get("modules/products_frontend/controller/controller_products_frontend.class.php?autocomplete=true", function (data, status) {
        var json = JSON.parse(data);
        var name_products = json.nom_productos;

        var suggestions = new Array();
        for (var i = 0; i < name_products.length; i++) {
            suggestions.push(name_products[i].name);
        }
        //alert("array: "+suggestions);
        //console.log(suggestions);

        $("#keyword").autocomplete({
            source: suggestions,
            minLength: 1,
            select: function (event, ui) {
                //alert(ui.item.label);
                var keyword = ui.item.label;
                count_product(keyword);
            }
        });

    }).fail(function (xhr) {
      $("#results").load("modules/products_frontend/controller/controller_products_frontend.class.php?view_error=false"); //view_error=false
      $('.pagination').html('');
      reset();

    });
});

function setCookie(cookieName, cookieValue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }
    return 0;
}
