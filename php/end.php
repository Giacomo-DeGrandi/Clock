<?php

require_once('model/Alarm.php');

$alarm = new Alarm();

// foreach $_POST of any key --->>> pass it through htmlspecialchars
foreach ($_POST as $key => $value) {
    $_POST[$key] = htmlspecialchars((string)$value, ENT_NOQUOTES | ENT_HTML5 | ENT_SUBSTITUTE,
        'UTF-8', /*double_encode*/ false );
}


if(isset($_POST['hour'])&&
    isset($_POST['min'])&&
    isset($_POST['sec'])&&
    isset($_POST['text'])){

    $h = filter_var($_POST['hour'], FILTER_SANITIZE_NUMBER_INT);
    $m = filter_var($_POST['min'], FILTER_SANITIZE_NUMBER_INT);
    $s = filter_var($_POST['sec'], FILTER_SANITIZE_NUMBER_INT);
    $txt = filter_var($_POST['text'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    if(strlen($h)===1) { $h = '0'.$h; }
    if(strlen($m)===1){ $m = '0'.$m; }
    if(strlen($s)===1){ $s = '0'.$s; }

    // get today date time
    $today = getdate();
    $date = $today['year'].'-'.$today['mon'].'-'.$today['mday'].' '.$h.':'.$m.':'.$s;
    $alarm->setTime($date,$txt);
    print_r(json_encode('setted'));
}




