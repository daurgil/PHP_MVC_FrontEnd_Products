<?php

    //include  with absolute route
    //include ($_SERVER['DOCUMENT_ROOT'] . "/php_mvc_products/modules/products/utils/utils_products.inc.php");
    include ($_SERVER['DOCUMENT_ROOT'] . "/php_mvc_products/utils/upload.php");
    session_start();
    //include 'modules/products/utils/utils_products.inc.php';

    if ((isset($_GET["upload"])) && ($_GET["upload"] == true)) {
        //echo json_encode("hola mundo");
        $result_img = upload_files();
        echo json_encode($result);
        exit;
        //$_SESSION['result_img'] = $result_img;

    }
    if ((isset($_POST['add_products_json']))) {
        add_products();
    }

    function add_products() {

        $jsondata = array();
        $productsJSON = json_decode($_POST['add_products_json'], true);
/*
        $result = validate_products($productsJSON);

        if (empty($_SESSION['result_img'])) {
          $_SESSION['result_img'] = array('resultado' => true, 'error' => "", 'datos' => 'media/default-avatar.png');
        }

        $result_img = $_SESSION['result_img'];

        if (()$result['result_php']) && ($result_img['resultado'])) {

          $arrArgument = array (
          'name'=> ucfirst($result['datos']['name']),
          'ident'=> $result['datos']['ident'],
          'description'=> ucfirst($result['datos']['description']),
          'quantity'=> $result['datos']['quantity'],
          'price'=> $result['datos']['price'],
          'colors'=> ucfirst($result['datos']['colors']),
          'gender'=> ucfirst($result['datos']['gender']),
          'country'=> ucfirst($result['datos']['country']),
          'province'=> ucfirst($result['datos']['province']),
          'location'=> ucfirst($result['datos']['location']),
          'date_reception'=> $result['datos']['date_reception'],
          'date_expiration'=> $result['datos']['date_expiration'],
          );

          $message = "Product has been successfully registered";

          //redireccion con $message y $arrArgument
          $_SESSION['prd'] = $arrArgument;
          $_SESSION['msg'] = $message;

          $callback = "index.php?module=products&view=results_products";
          $jsondata["success"] = true;
          $jsondata["redirect"] = $callback;
          echo json_encode($jsondata);
        */$jsondata['success']= true;
        $jsondata['name']= $productsJSON['name'];
        $jsondata['redirect2']= "asignado";
        echo json_encode($jsondata);
        exit;/*
      } else {
            $jsondata["success"] = false;
            $jsondata["error"] = $result['error'];
            $jsondata["error_avatar"] = $result_img['error'];

            $jsondata["success1"] = false;
            if ($result_img['resultado']) {
                $jsondata["success1"] = true;
                $jsondata["img_avatar"] = $result_img['datos'];
            }
            header('HTTP/1.0 400 Bad error');
            echo json_encode($jsondata);
        }*/
    }

    if (isset($_GET["delete"]) && $_GET["delete"] == true) {
        //echo json_encode("hola mundo2");

        //$_SESSION['result_avatar'] = array();
        $result = remove_files();
        echo json_encode($result);
        exit;
        /*if ($result === true) {
            echo json_encode(array("res" => true));
        } else {
            echo json_encode(array("res" => false));
        }*/
    }

//////////////////////////////////////////////////////////////// load
/*if (isset($_GET["load"]) && $_GET["load"] == true) {
    $jsondata = array();
    if (isset($_SESSION['products'])) {
        //echo debug($_SESSION['user']);
        $jsondata["products"] = $_SESSION['products'];
    }
    if (isset($_SESSION['msg'])) {
        //echo $_SESSION['msje'];
        $jsondata["msg"] = $_SESSION['msg'];
    }
    close_session();
    echo json_encode($jsondata);
    exit;
}

function close_session() {
    unset($_SESSION['products']);
    unset($_SESSION['msg']);
    $_SESSION = array(); // Destruye todas las variables de la sesión
    session_destroy(); // Destruye la sesión
}

/////////////////////////////////////////////////// load_data
if ((isset($_GET["load_data"])) && ($_GET["load_data"] == true)) {
    $jsondata = array();

    if (isset($_SESSION['products'])) {
        $jsondata["products"] = $_SESSION['products'];
        echo json_encode($jsondata);
        exit;
    } else {
        $jsondata["products"] = "";
        echo json_encode($jsondata);
        exit;
    }
}





    //include 'modules/products/view/create_products.php';
