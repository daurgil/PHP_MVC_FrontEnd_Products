<?php

function loadModel($model_path, $model_name, $function, $arrArgument = '') {
       $model = $model_path . $model_name . '.class.singleton.php';

       if (file_exists($model)) {
           include_once($model);

           $modelClass = $model_name;

           if (!method_exists($modelClass, $function)){
             /*loadView($_SERVER['DOCUMENT_ROOT']. '/php_mvc_products/view/inc/',
                     '404.php', ' Function not found in Model ');
               //die($function . ' function not found in Model ' . $model_name);*/
               throw new Exception();
           }

           $obj = $modelClass::getInstance();

           if (isset($arrArgument)) {
               return $obj->$function($arrArgument);
           }
       } else {
         throw new Exception();

            /*loadView($_SERVER['DOCUMENT_ROOT']. '/php_mvc_products/view/inc/',
                    '404.php', ' Model Not Found under Model Folder');
           //die($model_name . ' Model Not Found under Model Folder');*/
       }
}///END loadModel

function loadView($rutaVista="", $templateName="", $arrValue=''){
    $viewPath= $rutaVista . $templateName;
    $arrData= '';

    if(file_exists($viewPath)){
      if (isset($arrValue)) {
          $arrData=$arrValue;
      }
      include_once($viewPath);
    } else {
      $result = filter_num_int($rutaVista);
      if ($result['resultado']) {
        $rutaVista = $result['datos'];
      } else {
        $rutaVista = http_response_code();
      }

      $log=Log::getInstance();
      $log->add_log_general("error loadView general", $_GET['module'],
            "response ". $rutaVista);
      $log->add_log_product("error loadView general", "", $_GET['module'],
            "response ". $rutaVista); //$msg, $username = "", $controller, $function

      $result = response_code($rutaVista);
      $arrData = $result;

      /*$message = "NO TEMPLATE FOUND";
			$arrData = $message;*/
			require_once ($_SERVER['DOCUMENT_ROOT']. '/php_mvc_products/view/inc/templates_error/'. "error" .'.php');

    }
}////END loadView
