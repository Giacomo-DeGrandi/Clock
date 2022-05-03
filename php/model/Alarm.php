<?php

require_once('Model.php');

Class Alarm extends Model {

    function __construct(){}

    public function setTime($date,$text){
        $sql = "INSERT INTO alarms(time,text) VALUES ( :time , :text )";
        $p = ([':time' => $date , ':text' => $text ]);
        $this->selectQuery($sql, $p);
    }
    public function getTime(){
        // select only passed
		$tods  = getdate();
        $datenow = $tods['hours'].':'.$tods['minutes'].':'.$tods['seconds'];
		$startTime = new DateTime($datenow);
		$startTime->modify('-5 seconds');
		$datenow = $startTime->format('H:i:s');
        $sql = "SELECT id,time,text FROM alarms WHERE time < :time ORDER BY id DESC";
		$p = ([':time' => $datenow ]);
        $r = $this->selectQuery($sql,$p);	//
        $r = $r->fetchAll();
        return $r;
    }
    public function getFutures(){
        // select only passed
		$tods  = getdate();
        $datenow = $tods['hours'].':'.$tods['minutes'].':'.$tods['seconds'];
		$startTime = new DateTime($datenow);
		$startTime->modify('+20 seconds');
		$datenow = $startTime->format('H:i:s');
		$sql = "SELECT id,time,text FROM alarms WHERE time > :time ORDER BY time ASC";
		$p = ([':time' => $datenow ]);
        $r = $this->selectQuery($sql,$p);	//,$p
        $r = $r->fetchAll();
        return $r;
    }

}
