<?php

Abstract Class Model{

    public $conn;

    function connect(){

        $server="localhost:3306";
        $username="gidiclock";
        $password="gidiclock";
        $database="carlo-de-grandi-giacomo_clock";

        $dsn = "mysql:host=$server;dbname=$database;charset=UTF8";
        $this->conn = new PDO($dsn, $username, $password);
        return $this->conn;
    }

    function selectQuery($sql, $p = null){
        if ($p === null) {
            $r = $this->connect()->query($sql);
        } else {
            $r = $this->connect()->prepare($sql);
            $r -> execute($p);
        }
        return $r;
    }


}

