<?php
/*echo json_encode("model");
exit;*/
$path = $_SERVER['DOCUMENT_ROOT'] . '/php_mvc_products/';
define('SITE_ROOT', $path);
require(SITE_ROOT . 'modules/products_frontend/model/BLL/list_bll.class.singleton.php');

class list_model {
  /*echo json_encode("model");
  exit;*/
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = list_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function list_products() {
        return $this->bll->list_products_BLL();
    }

    public function details_products($id) {
        return $this->bll->details_products_BLL($id);
    }

}
