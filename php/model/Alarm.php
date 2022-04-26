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
        $sql = "SELECT * FROM alarms WHERE time < CURRENT_TIME ORDER BY time ASC";
        $r = $this->selectQuery($sql);
        $r = $r->fetchAll();
        return $r;
    }
    public function getFutures(){
        // select only passed
        $sql = "SELECT * FROM alarms WHERE time > CURRENT_TIME ORDER BY time ASC";
        $r = $this->selectQuery($sql);
        $r = $r->fetchAll();
        return $r;
    }
    public function delete(){
        $sql = "DELETE FROM alarms";
        $r = $this->selectQuery($sql);
    }
}
