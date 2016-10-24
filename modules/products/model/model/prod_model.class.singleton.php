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

    public function obtain_countrys($url) {
            return $this->bll->obtain_countrys_BLL($url);
        }

    public function obtain_provinces() {
        return $this->bll->obtain_provinces_BLL();
    }

    public function obtain_locations($arrArgument) {
        return $this->bll->obtain_locations_BLL($arrArgument);
    }

    public function list_products() {
        return $this->bll->list_products_BLL();
    }

    public function details_products($id) {
        return $this->bll->details_products_BLL($id);
    }

}
