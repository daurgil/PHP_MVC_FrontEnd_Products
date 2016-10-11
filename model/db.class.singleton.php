<?php
  class DB {
      private $servidor;
      private $usuario;
      private $password;
      private $base_datos;
      private $link;
      private $stmt;
      private $array;
      static $_instance;

      private function __construct() {
          $this->setConection();
          $this->conectar();
      }

      private function setConexion() {
          require_once 'conf.class.singleton.php';
          $conf = confDB::getInstance();

          $this->servidor = $conf->_hostdb;
          $this->base_datos = $conf->_db;
          $this->usuario = $conf->_userdb;
          $this->password = $conf->_passdb;
      }

      /*private function __clones(){

      }*/

      public static function getInstance() {
            if (!(self::$_instance instanceof self))
                self::$_instance = new self();
            return self::$_instance;
      }
  }
