<?php

require_once('model/Alarm.php');

$alarm = new Alarm();

if(isset($_POST['passed'])){
    $time = $alarm->getTime();
    print_r(json_encode($time));
}