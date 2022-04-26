<?php

require_once('model/Alarm.php');

$alarm = new Alarm();

if(isset($_POST['futures'])){
    $time = $alarm->getFutures();
    print_r(json_encode($time));
}