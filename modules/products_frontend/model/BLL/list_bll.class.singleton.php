<?php
define('MODEL_PATH', SITE_ROOT . '/model/');
require (MODEL_PATH . "db.class.singleton.php");

require(SITE_ROOT . "/modules/products_frontend/model/DAO/list_dao.class.singleton.php");

class list_bll {

    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = list_DAO::getInstance();
        $this->db = DB::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function list_products_BLL() {
        return $this->dao->list_products_DAO($this->db);
    }

    public function details_products_BLL($id) {
        return $this->dao->details_products_DAO($this->db,$id);
    }

    public function list_limit_products_BLL($arrArgument) {
        return $this->dao->list_limit_products_DAO($this->db, $arrArgument);
    }

    public function count_products_BLL() {
        return $this->dao->count_products_DAO($this->db);
    }

    public function select_column_products_BLL($arrArgument){
      return $this->dao->select_column_products_DAO($this->db,$arrArgument);
    }

    public function select_like_products_BLL($arrArgument){
      return $this->dao->select_like_products_DAO($this->db,$arrArgument);
    }

    public function count_like_products_BLL($arrArgument){
      return $this->dao->count_like_products_DAO($this->db,$arrArgument);
    }

    public function select_like_limit_products_BLL($arrArgument){
      return $this->dao->select_like_limit_products_DAO($this->db,$arrArgument);
    }
    /*public function page_products_BLL($arrArgument) {
        return $this->dao->page_products_DAO($this->db,$arrArgument);
    }

    public function total_products_BLL() {
        return $this->dao->total_products_DAO($this->db);
    }*/
}
