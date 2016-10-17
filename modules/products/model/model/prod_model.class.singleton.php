<?php
/*echo json_encode("model");
exit;*/
$path = $_SERVER['DOCUMENT_ROOT'] . '/php_mvc_products/';
define('SITE_ROOT', $path);
require(SITE_ROOT . 'modules/products/model/BLL/prod_bll.class.singleton.php');

class prod_model {
  /*echo json_encode("model");
  exit;*/
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = prod_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function add_product($arrArgument) {
        return $this->bll->add_product_BLL($arrArgument);
    }

}
