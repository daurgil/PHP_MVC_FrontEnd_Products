<?php

function validate_products($value){

    $error = array();
    $valido = true;
    $filtro = array(
        'name' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp'=> " /^[0-9a-zA-Z]+[\-'\s]?[0-9a-zA-Z ]+$/")
        ),
        'ident' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp'=> '/^([0-9])*$/')
        ),
        'description' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp'=> '/[0-9a-zA-ZñÑ\\s]{2,250}$/')
        ),
        'quantity' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp'=> '/^([0-9])*$/')
        ),
        'price' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp'=> '/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/')
        ),
        'date_reception' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp'=> '/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/')
        ),
        'date_expiration' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp'=> '/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/')
        )
    );


    $result_php = filter_var_array($value, $filtro);


    //sin filtros
    $result_php['colors'] = $value['colors'];
    $result_php['gender'] = $value['gender'];
    $result_php['country'] = $value['country'];
    $result_php['province'] = $value['province'];
    $result_php['location'] = $value['location'];


    if ($result_php['date_reception']) {

        $dates = validate_time($value['date_reception']);

        if (!$dates) {
            $error['date_reception'] = 'It must be before today';
            $valido = false;
        }
    }

    if ($result_php['date_reception'] && $result_php['date_expiration']) {
        //compare date of birth with title_date
        $dates = valida_dates($value['date_reception'], $value['date_expiration']);

        if (!$dates) {
            $error['date_reception'] = 'Reception must be before the date of expiration';
            $valido = false;
        }
    }

    if (count($result_php['colors']) <= 0) {
        $error['colors'] = "Select 1 or more.";
        $valido =  false;
    }

    if ($result_php['country'] === 'Select country') {

        $error['country'] = "You haven't select country.";
        $valido = false;
    }

    if ($result_php['province'] === 'Select province') {
        $error['province'] = "You haven't select province.";
        $valido = false;
    }

    if ($result_php['location'] === 'Select location') {
        $error['location'] = "You haven't select location.";
        $valido = false;
    }

    if ($result_php !=null && $result_php) {

        if (!$result_php['name']) {
            $error['name'] = 'Name must be 2 to 30 characters';
            $valido= false;
        }

        if (!$result_php['ident']) {
            $error['ident'] = 'Need be a number';
            $valido= false;
        }

        if (!$result_php['description']) {
            $error['description'] = 'Need write something';
            $valido= false;
        }

        if (!$result_php['quantity']) {
            $error['quantity'] = 'Need be a number';
            $valido= false;
        }

        if (!$result_php['price']) {
            $error['price'] = 'Need be a number';
            $valido= false;
        }

        if (!$result_php['date_reception']) {
            if ($value['date_reception'] == "") {
                $error['date_reception'] = "this camp can't be empty";
                $valido = false;
            }
        }

        if (!$result_php['date_expiration']) {
            if ($value['date_expiration'] == "") {
                $error['date_expiration'] = "this camp can't be empty";
                $valido = false;
            }
        }

    } else {
      $valido = false;
    }


    return $return = array('result_php' => $valido, 'error'=> $error, 'datos'=> $result_php);
}

///////////No funciona con nuetro codigo//////////////
/*function valida_dates($start_days, $dayslight) {

    /*$start_days = strtotime($start_days);
    $dayslight = strtotime($dayslight);
    if (!strtotime($dayslights)) {
      debugPHP("hola");
    }
    $start_day = date("m/d/Y", strtotime($start_days));
    $daylight = date("m/d/Y", strtotime($dayslight));

    list($mes_one, $dia_one, $anio_one) = split('/', $start_day);
    list($mes_two, $dia_two, $anio_two) = split('/', $daylight);

    $dateOne = new DateTime($anio_one . "-" . $mes_one . "-" . $dia_one);
    $dateTwo = new DateTime($anio_two . "-" . $mes_two . "-" . $dia_two);

    if ($dateOne <= $dateTwo) {
        return true;
    }
    return false;
}*/


function valida_dates ($start_days, $dayslights) {

  $day1 = substr($start_days, 0, 2);
  $month1 = substr($start_days, 3, 2);
  $year1 = substr($start_days, 6, 4);
  $day2 = substr($dayslights, 0, 2);
  $month2 = substr($dayslights, 3, 2);
  $year2 = substr($dayslights, 6, 4);
  /*echo json_encode(strtotime($day2 . "-" . $month2 . "-" . $year2));
  exit;*/
  if(strtotime($day1 . "-" . $month1 . "-" . $year1) <= strtotime($day2 . "-" . $month2 . "-" . $year2)){
      return true;
  }
  return false;
}

function validate_time($reception) {
    // $reception can be UNIX_TIMESTAMP or just a string-date.

    if (is_string($reception)) {
        $day1 = substr($reception, 0, 2);
        $month1 = substr($reception, 3, 2);
        $year1 = substr($reception, 6, 4);

        $reception = strtotime($day1 . "-" . $month1 . "-" . $year1) ;

    }

    // check
    // 31536000 is the number of seconds in a 365 days year.
    if (time() < $reception) {
        return false;
    }

    return true;
}
