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

    public function obtain_countrys_DAO($url) {
        $ch = curl_init();
        curl_setopt ($ch, CURLOPT_URL, $url);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $file_contents = curl_exec($ch);
        curl_close($ch);

        return ($file_contents) ? $file_contents : FALSE;
    }

    public function obtain_provinces_DAO() {
        $json = array();
		    $tmp = array();

    		$provinces = simplexml_load_file($_SERVER['DOCUMENT_ROOT']."/php_mvc_products/resources/provinciasypoblaciones.xml");
    		$result = $provinces->xpath("/lista/provincia/nombre | /lista/provincia/@id");
    		for ($i=0; $i<count($result); $i+=2) {
    			$e=$i+1;
    			$province=$result[$e];

    			$tmp = array(
    				'id' => (string) $result[$i], 'nombre' => (string) $provincia
    			);
    			array_push($json, $tmp);
    		}
        return $json;
    }

    public function obtain_locations_DAO($arrArgument) {
        $json = array();
		    $tmp = array();

        $filter = (string)$arrArgument;
        $xml = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/php_mvc_products/resources/provinciasypoblaciones.xml');
		    $result = $xml->xpath("/lista/provincia[@id='$filter']/localidades");

      	for ($i=0; $i<count($result[0]); $i++) {
      		$tmp = array(
      			'poblacion' => (string) $result[0]->localidad[$i]
      		);
      		array_push($json, $tmp);
      	}
        return $json;
    }
}
