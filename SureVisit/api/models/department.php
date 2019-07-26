<?php

    // 'department' model
    class Department{
    
        // database connection and table name
        private $conn;
        private $table_name = "departments";
    
        // constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // function to get the data from the database
        public function getDepts(){

            $query = "SELECT * FROM ".$this->table_name;

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'name' => $name,
                        'status' => $status,
                        'fee' => $fee
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no department available"));
            }

        }


        public function deptnum(){
            $query = "SELECT * FROM ".$this->table_name;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

    }

?>