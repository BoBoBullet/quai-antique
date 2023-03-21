<?php
session_start();
error_reporting(E_ALL);
ini_set('display_error', 1);
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods:* ");

$db_conn= mysqli_connect("localhost", "root", "", "quai_antique");
if($db_conn===false)
{
    die("ERROR: Connexion impossible".mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method)
{
    case "GET":
        $alluser= mysqli_query($db_conn, "SELECT * FROM users");
        if(mysqli_num_rows($alluser) > 0)
        {
            while($row= mysqli_fetch_array($alluser))
            {
                $json_array["userdata"][]= array("id"=>$row['id'], "useremail"=>$row['useremail'], "usercovers"=>$row['usercovers'], "userallergies"=>$row['userallergies']);
            }
            echo json_encode($json_array["userdata"]);
            return;
        } else {
            echo json_encode(["result"=>"controlez les data"]);
            return;
        }

        break;

        case "POST" :
        
            $userpostdata= json_decode(file_get_contents("php://input"));
            $useremail= $userpostdata->useremail;
            $password= $userpostdata->password;
            $usercovers= $userpostdata->usercovers;
            $userallergies= $userpostdata->userallergies;
            
            if($useremail && $password){
                $sql="SELECT * FROM users WHERE useremail='$useremail'";
                $result= mysqli_query($db_conn, $sql);
                $present= mysqli_num_rows($result);
                if($present>0){
                    echo json_encode(["success"=>"Adresse email dèjà utilisée par un compte !"]);
                } else{

                $result= mysqli_query($db_conn, "INSERT INTO users (useremail, password, usercovers, userallergies) VALUES('$useremail', '$password', '$usercovers', '$userallergies')");

                if($result)
                {
                    echo json_encode(["success"=>"Compte créé !"]);
                    return;
                } else {
                    echo json_encode(["success"=>"Veuillez vérifier les données saisies !"]);
                    return;
                }
            }
        }
            break;
    }

?>