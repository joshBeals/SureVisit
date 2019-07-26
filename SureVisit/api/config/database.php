<?php

    // used to get mysql database connection
    class DB_Connect {

        // specify your own database credentials
        private $host = "localhost";
        private $db_name = "surevisit";
        private $username = "root";
        private $password = "";
        public $conn;

        // get the database connection
        public function connect(){

            $this->conn = null;

            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            }catch(PDOException $exception){
                echo "Connection error: " . $exception->getMessage();
            }
 
            return $this->conn;
        }
    }
?>