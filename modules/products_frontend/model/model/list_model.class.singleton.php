<?php
/*echo json_encode("model");
exit;*/
require(SITE_ROOT . '/modules/products_frontend/model/BLL/list_bll.class.singleton.php');

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

    public function page_products($arrArgument) {
        return $this->bll->page_products_BLL($arrArgument);
    }

    public function total_products() {
        return $this->bll->total_products_BLL();
    }

}
