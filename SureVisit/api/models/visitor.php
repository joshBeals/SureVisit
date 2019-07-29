<?php

    // 'visitor' model
    class Visitor{
    
        // database connection
        private $conn;
    
        // model properties
        public $id;
        public $firstname;
        public $lastname;
        public $email;
        public $mobile;
        public $wtm;
        public $rfm;
        public $address;
    
        // constructor
        public function __construct($db){
            $this->conn = $db;
        }

        public function add_new_visitor(){

            $query = "CREATE TABLE IF NOT EXISTS visitors (
                id INT(11) NOT NULL AUTO_INCREMENT,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                mobile VARCHAR(255) NOT NULL,
                adress VARCHAR(255) NOT NULL,
                wtm VARCHAR(255) NOT NULL,
                rfm VARCHAR(255) NOT NULL,
                time_in DATETIME NOT NULL,
                time_out DATETIME,
                PRIMARY KEY(id)
            )";
            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "INSERT INTO visitors
                SET
                    firstname = :firstname,
                    lastname = :lastname,
                    email = :email,
                    mobile = :mobile,
                    wtm = :wtm,
                    rfm = :rfm,
                    adress = :adress,
                    time_in = CURRENT_TIMESTAMP";

                // prepare the query
                $stmt = $this->conn->prepare($query);

                // sanitize
                $this->firstname=htmlspecialchars(strip_tags($this->firstname));
                $this->lastname=htmlspecialchars(strip_tags($this->lastname));
                $this->email=htmlspecialchars(strip_tags($this->email));
                $this->mobile=htmlspecialchars(strip_tags($this->mobile));
                $this->wtm=htmlspecialchars(strip_tags($this->wtm));
                $this->rfm=htmlspecialchars(strip_tags($this->rfm));
                $this->adress=htmlspecialchars(strip_tags($this->address));

                // bind the values
                $stmt->bindParam(':firstname', $this->firstname);
                $stmt->bindParam(':lastname', $this->lastname);
                $stmt->bindParam(':email', $this->email);
                $stmt->bindParam(':mobile', $this->mobile);
                $stmt->bindParam(':wtm', $this->wtm);
                $stmt->bindParam(':rfm', $this->rfm);
                $stmt->bindParam(':adress', $this->address);

                // execute the query, also check if query was successful
                if($stmt->execute()){
                    return array("status"=>"1", "message" => "visitor added successfully.");
                }

                return array("status"=>"0", "message" => "visitor not added.");
            }

        }

        public function getVisitors(){

            $query = "SELECT * FROM visitors";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'firstname' => $firstname,
                        'lastname' => $lastname,
                        'email' => $email,
                        'mobile' => $mobile,
                        'wtm' => $wtm,
                        'time_in' => $time_in,
                        'time_out' => $time_out
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no visitors signed in available"));
            }

        }

        public function signout($id){

            $query = "UPDATE visitors SET time_out = CURRENT_TIMESTAMP WHERE id = ".$id;

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                return true;
            }

            return false;

        }

    }

?>