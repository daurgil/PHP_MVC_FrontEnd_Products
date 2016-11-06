//we do this so that  details_prod don't appear

$(document).ready(function () {
    $('.product_id').css('cursor', 'pointer');
    $('.product_id').click(function () {
        var id = this.getAttribute('id');
        console.log(id);
        //alert(id);

        $.get("modules/products_frontend/controller/controller_products_frontend.class.php?idProduct=" + id, function (data, status) {
            console.log(data);
            var json = JSON.parse(data);
            var product = json.product;
            console.log(product);

            $('#results').html('');
            $('.pagination').html('');

            var img_product = document.getElementById('img_prod');
            img_product.innerHTML = '<img src="' + product.img_icon + '" class="img-product"> ';

            var nom_product = document.getElementById('name_prod');
            nom_product.innerHTML = product.name;
            var desc_product = document.getElementById('description_prod');
            desc_product.innerHTML = product.description;
            var price_product = document.getElementById('price_prod');
            price_product.innerHTML = "Precio: " + product.price + " €";
            price_product.setAttribute("class", "special");

        })
                .fail(function (xhr) {
                    $("#results").load("modules/products_frontend/controller/controller_products_frontend.class.php?view_error=true");
                });
    });
});
