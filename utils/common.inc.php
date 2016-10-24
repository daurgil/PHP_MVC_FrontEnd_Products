<?php

function loadModel($model_path, $model_name, $function, $arrArgument = '') {
       $model = $model_path . $model_name . '.class.singleton.php';

       if (file_exists($model)) {
           include_once($model);

           $modelClass = $model_name;

           if (!method_exists($modelClass, $function)){
             loadView($_SERVER['DOCUMENT_ROOT']. '/php_mvc_products/view/inc/',
                     '404.php', ' Function not found in Model ');
               //die($function . ' function not found in Model ' . $model_name);
           }

           $obj = $modelClass::getInstance();

           if (isset($arrArgument)) {
               return $obj->$function($arrArgument);
           }
       } else {
            loadView($_SERVER['DOCUMENT_ROOT']. '/php_mvc_products/view/inc/',
                    '404.php', ' Model Not Found under Model Folder');
           //die($model_name . ' Model Not Found under Model Folder');
       }
}///END loadModel

function loadView($rutaVista, $templateName, $arrValue=''){
    $viewPath= $rutaVista . $templateName;
    $arrData= '';

    if(file_exists($viewPath)){
      if (isset($arrValue)) {
          $arrData=$arrValue;
      }
      include_once($viewPath);
    } else {
      $message = "NO TEMPLATE FOUND";
			$arrData = $message;
			require_once ($_SERVER['DOCUMENT_ROOT']. '/php_mvc_products/view/inc/404.php');
			die();
    }
}////END loadView
