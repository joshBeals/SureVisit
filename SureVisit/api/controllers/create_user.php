<?php

    // required headers
    header("Access-Control-Allow-Origin: http://localhost/surepay/api");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    // files needed to connect to database
    include_once '../config/database.php';
    include_once '../models/user.php';
    
    // get database connection
    $database = new DB_Connect();
    $db = $database->connect();

    // instantiate useer model
    $user = new User($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // set property values
    $user->fullname = $data->fullname;
    $user->password = $data->password;
    $user->email = $data->email;

    // create the user
    if(
        !empty($user->fullname) &&
        !empty($user->email) &&
        !empty($user->password)
    ){
    
        // set response code
        http_response_code(200);
    
        // display message: user was created
        echo $user->create();
    }
    
    // message if unable to create user
    else{
    
        // set response code
        http_response_code(400);
    
        // display message: unable to create user
        echo json_encode(array("status"=>"0", "message" => "Fields cannot be left empty."));
    }

?>