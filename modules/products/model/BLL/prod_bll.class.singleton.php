<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/php_mvc_products/';
define('SITE_ROOT', $path);
define('MODEL_PATH', SITE_ROOT . 'model/');

require (MODEL_PATH . "db.class.singleton.php");
require(SITE_ROOT . "modules/products/model/DAO/prod_dao.class.singleton.php");

class prod_bll {

    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = prod_DAO::getInstance();
        $this->db = DB::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function add_product_BLL($arrArgument) {
        return $this->dao->add_product_DAO($this->db, $arrArgument);
    }

    public function obtain_countrys_BLL($url) {
        return $this->dao->obtain_countrys_DAO($url);
    }

    public function obtain_provinces_BLL() {
        return $this->dao->obtain_provinces_DAO();
    }

    public function obtain_locations_BLL($arrArgument) {
        return $this->dao->obtain_locations_DAO($arrArgument);
    }
}
