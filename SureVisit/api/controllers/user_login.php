<?php

    // required headers
    header("Access-Control-Allow-Origin: http://localhost/surevisit/api");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // include json web token files
    include_once '../config/core.php';
    include_once '../vendors/php-jwt-master/src/BeforeValidException.php';
    include_once '../vendors/php-jwt-master/src/ExpiredException.php';
    include_once '../vendors/php-jwt-master/src/SignatureInvalidException.php';
    include_once '../vendors/php-jwt-master/src/JWT.php';

    use \Firebase\JWT\JWT;

    // files needed to connect to database
    include_once '../config/database.php';
    include_once '../models/user.php';
    
    // get database connection
    $database = new DB_Connect();
    $db = $database->connect();
    
    // instantiate user object
    $user = new User($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // set product property values
    $user->username = $data->username;
    $user->password = $data->password;
    $user_exists = $user->userExists();

    if(
        !empty($user->username) &&
        !empty($user->password)
    ){
        // check if email exists and if password is correct
        if($user_exists && password_verify($data->password, $user->password)){
        
            $token = array(
            "iss" => $iss,
            "aud" => $aud,
            "iat" => $iat,
            "nbf" => $nbf,
            "data" => array(
                    "id" => $user->id,
                    "username" => $user->username
                )
            );
        
            // set response code
            http_response_code(200);
        
            // generate jwt
            $jwt = JWT::encode($token, $key);
            echo json_encode(
                array(
                    "status" => "1",
                    "message" => "You are successfully logged in.",
                    "jwt" => $jwt
                )
            );
        
        }else{

            // set response code
            http_response_code(401);
        
            // tell the user login failed
            echo json_encode(array("status" => "0", "message" => "Invalid login details."));

        }
    }else{
    
        // set response code
        http_response_code(400);
    
        // display message: unable to create user
        echo json_encode(array("status"=>"0", "message" => "Fields cannot be left empty."));
    }

?>