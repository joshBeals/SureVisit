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
        public function update(){
        
            // if password needs to be updated
            $password_set=!empty($this->password) ? ", password = :password" : "";
        
            // if no posted password, do not update the password
            $query = "UPDATE " . $this->table_name . "
                    SET
                        username = :username
                        {$password_set}
                    WHERE id = :id";
        
            // prepare the query
            $stmt = $this->conn->prepare($query);
        
            // sanitize
            $this->firstname=htmlspecialchars(strip_tags($this->username));
        
            // bind the values from the form
            $stmt->bindParam(':fullname', $this->fullname);
        
            // hash the password before saving to database
            if(!empty($this->password)){
                $this->password=htmlspecialchars(strip_tags($this->password));
                $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
                $stmt->bindParam(':password', $password_hash);
            }
        
            // unique ID of record to be edited
            $stmt->bindParam(':id', $this->id);
        
            // execute the query
            if($stmt->execute()){
                return true;
            }
        
            return false;
        }

    }

?>