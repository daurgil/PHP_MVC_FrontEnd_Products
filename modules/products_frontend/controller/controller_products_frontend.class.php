<?php
session_start();
//include ($_SERVER['DOCUMENT_ROOT'] . "/php_mvc_products/modules/products_frontend/utils/utils_list.inc.php");
include ($_SERVER['DOCUMENT_ROOT'] . "/php_mvc_products/utils/common.inc.php");

/////////////Get Product by DB to list
if ($_GET["idProduct"]) {
    $id = $_GET["idProduct"];

    $path_model = $_SERVER['DOCUMENT_ROOT'] . '/php_mvc_products/modules/products_frontend/model/model/';
    $arrValue = loadModel($path_model, "list_model", "details_products",$id);

    if ($arrValue[0]) {
        loadView($_SERVER['DOCUMENT_ROOT'].'/php_mvc_products/modules/products_frontend/view/', 'details_products.php', $arrValue[0]);
    } else {
        $message = "NOT FOUND PRODUCT";
        loadView($_SERVER['DOCUMENT_ROOT'] . '/php_mvc_products/view/inc/', '404.php', $message);
    }
} else {
    $path_model = $_SERVER['DOCUMENT_ROOT'] . '/php_mvc_products/modules/products_frontend/model/model/';
    $arrValue = loadModel($path_model, "list_model", "list_products");

    if ($arrValue) {
        loadView($_SERVER['DOCUMENT_ROOT'].'/php_mvc_products/modules/products_frontend/view/', 'list_products.php', $arrValue);
    } else {
        $message = "NOT PRODUCTS";
        loadView($_SERVER['DOCUMENT_ROOT'] . '/php_mvc_products/view/inc/', '404.php', $message);
    }
}
