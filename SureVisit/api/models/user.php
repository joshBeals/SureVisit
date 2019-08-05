<?php

    // 'user' model
    class User{
    
        // database connection and table name
        private $conn;
    
        // model properties
        public $id;
        public $username;
        public $password;
    
        // constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // check if given user exist in the database
        function userExists(){
        
            // query to check if username exists
            $query = "SELECT id, username, password
                    FROM admin
                    WHERE username = ?";
        
            // prepare the query
            $stmt = $this->conn->prepare( $query );
        
            // sanitize
            $this->username=htmlspecialchars(strip_tags($this->username));
        
            // bind given username value
            $stmt->bindParam(1, $this->username);
        
            // execute the query
            $stmt->execute();
        
            // get number of rows
            $num = $stmt->rowCount();
        
            // if user exists, assign values to object properties for easy access and use for php sessions
            if($num>0){       

                // get record details / values
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
                // assign values to object properties
                $this->id = $row['id'];
                $this->username = $row['username'];
                $this->password = $row['password'];
                // return true because email exists in the database
                return true;
            }
            // return false if email does not exist in the database
            return false;
        }

        // update a user record
        public function changePassword($oldPassword, $newPassword){
            $query = "SELECT * FROM admin";
            $stmt = $this->conn->prepare($query);
            if($stmt->execute()){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    if(password_verify($oldPassword, $row['password'])){
                        $pass = password_hash(htmlspecialchars(strip_tags($newPassword)), true);

                        $query = "UPDATE admin
                                SET
                                    password = '$pass'
                                WHERE id = 1";

                        // prepare the query
                        $stmt = $this->conn->prepare($query);

                        // execute the query
                        if($stmt->execute()){
                            return true;
                        }

                        return false;
                    }

                    return false;
                }
            }
            else{
                return false;
            }
        }

    }

?>