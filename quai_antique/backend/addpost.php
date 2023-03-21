<?php
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
        echo"get api"; die;
    break;
        
    case "POST" :

        if(isset($_FILES['img']))
        {
            $title= $_POST['title'];
            $descr= $_POST['descr'];
            $category= $_POST['category'];
            $price= $_POST['price'];
            $img= time().$_FILES['img']['name'];
            $img_temp= $_FILES['img']['tmp_name'];
            $destination= $_SERVER['DOCUMENT_ROOT'].'/quai_antique/images'."/".$img;

            $result = mysqli_query($db_conn, "INSERT INTO posts (title, descr, img, category, price) VALUES('$title', '$descr', '$img', '$category', '$price')");

            if($result)
            {
                move_uploaded_file($img_temp, $destination);
                echo json_encode(["success"=>"Post créé !"]);
                return;
            } else {
                echo json_encode(["success"=>"Impossible de créer le post !"]);
                return;
            }
            
        } else {
            echo json_encode(["success"=>"Données incorrectes !"]);
                return;
        }

    break;

    case "DELETE":
        
    break;
    }

?>