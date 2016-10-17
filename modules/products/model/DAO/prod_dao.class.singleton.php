<?php
/*echo json_encode('DAO');
exit;*/
class prod_DAO {

    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {

        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function add_product_DAO($db, $arrArgument) {
        $name = $arrArgument['name'];
        $ident = $arrArgument['ident'];
        $description= $arrArgument['description'];
        $quantity = $arrArgument['quantity'];
        $price = $arrArgument['price'];
        $colors= $arrArgument['colors'];
        $gender = $arrArgument['gender'];
        $country = $arrArgument['country'];
        $province= $arrArgument['province'];
        $location = $arrArgument['location'];
        $date_reception = $arrArgument['date_reception'];
        $date_expiration= $arrArgument['date_expiration'];
        $img_icon= $arrArgument['img_icon'];

        $red = 0;
        $blue = 0;
        $green = 0;
        $white = 0;
        $black = 0;
        $others = 0;

        foreach ($colors as $indice) {
            if ($indice === 'red')
                $red = 1;
            if ($indice === 'blue')
                $blue = 1;
            if ($indice === 'green')
                $green = 1;
            if ($indice === 'white')
                $white = 1;
            if ($indice === 'black')
                $black = 1;
            if ($indice === 'others')
                $others = 1;
        }

        $sql = "INSERT INTO products(name, ident, description, quantity,"
	                . " price, Rojo, Azul, Verde, Blanco,"
                  ." Negro, Otros, gender, country, province, location,"
									." date_reception, date_expiration, img_icon) VALUES ('$name', '$ident', '$description', '$quantity',"
                  ." '$price', '$red', '$blue', '$green', '$white', '$black', '$others',"
                  ."'$gender', '$country', '$province', '$location', '$date_reception', '$date_expiration',"
                  ."  '$img_icon')";
        
        return $db->ejecutar($sql);
    }

}
