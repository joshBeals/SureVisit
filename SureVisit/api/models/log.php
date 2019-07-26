<?php

    // 'department' model
    class Log{
    
        // database connection and table name
        private $conn;
        private $table_name = "payment_log";

        // set property values
        public $userID;
        public $deptID;
        public $transactionID;
        public $status;
        public $amount;
    
        // constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // function to get the data from the database
        public function savePayment(){

            // insert query
            $query = "INSERT INTO " . $this->table_name . "
            SET
                userID = :userID,
                deptID = :deptID,
                transactionID = :transactionID,
                status = :status,
                amount = :amount";

            // prepare the query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->userID=htmlspecialchars(strip_tags($this->userID));
            $this->deptID=htmlspecialchars(strip_tags($this->deptID));
            $this->transactionID=htmlspecialchars(strip_tags($this->transactionID));
            $this->status=htmlspecialchars(strip_tags($this->status));
            $this->amount=htmlspecialchars(strip_tags($this->amount));

            // bind the values
            $stmt->bindParam(':userID', $this->userID);
            $stmt->bindParam(':deptID', $this->deptID);
            $stmt->bindParam(':transactionID', $this->transactionID);
            $stmt->bindParam(':status', $this->status);
            $stmt->bindParam(':amount', $this->amount);

            // execute the query, also check if query was successful
            if($stmt->execute()){
                return array("status"=>"1", "message" => "payment added successfully.");
            }

            return array("status"=>"0", "message" => "payment not added.");
                

        }


        public function paymentLog($userID){

            $query = "SELECT 
                    payment_log.id,
                    payment_log.amount,
                    payment_log.transactionID,
                    payment_log.status,
                    payment_log.deptID,
                    payment_log.date,
                    departments.name
                FROM
                    payment_log
                INNER JOIN 
                    departments
                ON 
                    payment_log.deptID = departments.id
                WHERE
                    payment_log.userID = ".$userID;

            // Prepare Statement
            $stmt = $this->conn->prepare($query);

            // Execute Query
            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    array_push($data, $row);
                }
                return ($data);
            }else{
               return (array("message" => "no log available"));
            }

        }

    }

?>