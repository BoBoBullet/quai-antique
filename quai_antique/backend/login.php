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

$useremail = $_POST['useremail'];  
$password = $_POST['password'];  
      
$useremail = stripcslashes($useremail);  
$password = stripcslashes($password);  
$useremail = mysqli_real_escape_string($db_conn, $useremail);  
$password = mysqli_real_escape_string($db_conn, $password);  
      
$sql = "SELECT * FROM users WHERE useremail = '$useremail' AND password = '$password'";  
$result = mysqli_query($db_conn, $sql);  
$row = $result->fetch_array(MYSQLI_ASSOC);  
$count = mysqli_num_rows($result);  

if($count == 1){  
    echo "connexion réussie";  
 }  
else{  
    echo "Connexion échouée";  
 }     
?>  