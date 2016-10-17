<?php
	session_start();
	include ($_SERVER['DOCUMENT_ROOT'] . "/php_mvc_products/modules/products/utils/utils_products.inc.php");
	include ($_SERVER['DOCUMENT_ROOT'] . "/php_mvc_products/utils/upload.php");
	include ($_SERVER['DOCUMENT_ROOT'] . "/php_mvc_products/utils/common.inc.php");



  ////////////////////////////
  if ((isset($_GET["upload"])) && ($_GET["upload"] == true)) {
  		$result_img = upload_files();
			$_SESSION['result_img']=$result_img;
  		//echo json_encode($result_avatar);
  		//exit;
  }

///////////////////////////////////

	if ((isset($_POST['add_products_json']))) {
	    add_products();
	}

	function add_products() {

			$jsondata = array();
			$productsJSON = json_decode($_POST['add_products_json'], true);

			$result = validate_products($productsJSON);

			if (empty($_SESSION['result_img'])) {
				$_SESSION['result_img'] = array('resultado' => true, 'error' => "", 'datos' => 'media/default-avatar.png');
			}

			$result_img = $_SESSION['result_img'];

			if (($result['result_php']) && ($result_img['resultado'])) {

				$arrArgument = array (
				'name'=> ucfirst($result['datos']['name']),
				'ident'=> $result['datos']['ident'],
				'description'=> ucfirst($result['datos']['description']),
				'quantity'=> $result['datos']['quantity'],
				'price'=> $result['datos']['price'],
				'colors'=> $result['datos']['colors'],
				'gender'=> ucfirst($result['datos']['gender']),
				'country'=> ucfirst($result['datos']['country']),
				'province'=> ucfirst($result['datos']['province']),
				'location'=> ucfirst($result['datos']['location']),
				'date_reception'=> $result['datos']['date_reception'],
				'date_expiration'=> $result['datos']['date_expiration'],
				'img_icon' => $result_img['datos']
				);

				/////////////////insert into BD////////////////////////
        $arrValue = false;
        $path_model = $_SERVER['DOCUMENT_ROOT'] . '/php_mvc_products/modules/products/model/model/';
        $arrValue = loadModel($path_model, "prod_model", "add_product", $arrArgument);

        //die();

        if ($arrValue){
            $message = "Su registro se ha efectuado correctamente, para finalizar compruebe que ha recibido un correo de validacion y siga sus instrucciones";
        }else{
            $message = "No se ha podido realizar su alta. Intentelo mas tarde";
				}
				//$message = "Product has been successfully registered";

				//redireccion con $message y $arrArgument
				$_SESSION['prd'] = $arrArgument;
				$_SESSION['msg'] = $message;

				$callback = "index.php?module=products&view=results_products";
				$jsondata["success"] = true;
				$jsondata["redirect"] = $callback;
				echo json_encode($jsondata);

		} else {
					$jsondata["success"] = false;
					$jsondata["error"] = $result['error'];
					$jsondata["error_img"] = $result_img['error'];

					$jsondata["success1"] = false;
					if ($result_img['resultado']) {
							$jsondata["success1"] = true;
							$jsondata["img_icon"] = $result_img['datos'];
					}
					header('HTTP/1.0 400 Bad error');
					echo json_encode($jsondata);
			}
	}

	//////////////////////////
  if (isset($_GET["delete"]) && $_GET["delete"] == true) {
		$_SESSION['result_img'] = array();
		$result_delete = remove_files();
		if ($result_delete === true) {
        echo json_encode(array("res" => true));
    } else {
        echo json_encode(array("res" => false));
    }
  	//echo json_encode($result);
  	//exit;
  }

	//////////////////////////////////////////////////////////////// load
	if (isset($_GET["load"]) && $_GET["load"] == true) {
	    $jsondata = array();
	    if (isset($_SESSION['prd'])) {
	        //echo debug($_SESSION['user']);
	        $jsondata["prd"] = $_SESSION['prd'];
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
	    unset($_SESSION['prd']);
	    unset($_SESSION['msg']);
	    $_SESSION = array(); // Destruye todas las variables de la sesión
	    session_destroy(); // Destruye la sesión
	}

	/////////////////////////////////////////////////// load_data
	if ((isset($_GET["load_data"])) && ($_GET["load_data"] == true)) {
	    $jsondata = array();

	    if (isset($_SESSION['prd'])) {
	        $jsondata["prd"] = $_SESSION['prd'];
	        echo json_encode($jsondata);
	        exit;
	    } else {
	        $jsondata["prd"] = "";
	        echo json_encode($jsondata);
	        exit;
	    }
	}
