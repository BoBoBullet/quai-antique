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
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && is_numeric($path[4]))
        {
            $json_array = array();
            $postid = $path[4];

            $getpostrow = mysqli_query($db_conn, "SELECT *FROM posts WHERE id ='$postid'");
            
            while($postrow= mysqli_fetch_array($getpostrow))
            {
                $json_array['rowPostdata'] = array('id'=> $postrow['id'], 'title'=>$postrow['title'], 'descr'=>$postrow['descr'], 'img'=>$postrow['img'], 'category'=>$postrow['category'], 'price'=>$postrow['price']);
            }
            echo json_encode($json_array["rowPostdata"]);
            return;
        } else {
            $allposts= mysqli_query($db_conn, "SELECT * FROM posts");
            if(mysqli_num_rows($allposts) > 0)
            {
                while($row= mysqli_fetch_array($allposts))
                {
                    $json_array["postdata"][]= array("id"=>$row['id'], "title"=>$row['title'], "descr"=>$row['descr'], "img"=>$row['img'], "category"=>$row['category'], "price"=>$row['price']);
                }
                echo json_encode($json_array["postdata"]);
                return;
            } else {
                echo json_encode(["result"=>"controlez les data"]);
                return;
            }
        }
        

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

            case "PUT":
                $postUpdate = json_decode(file_get_contents("php://input"));

                $id = $postUpdate->id;
                $postTitle = $postUpdate->title;
                $postDescr = $postUpdate->descr;
                $postImg = $postUpdate->img;
                $postCategory = $postUpdate->category;
                $postPrice = $postUpdate->price;
                

                $updateData = mysqli_query($db_conn, "UPDATE posts SET title='$postTitle', descr='$postDescr', img='$postImg', category='$postCategory', price='$postPrice' WHERE id='$id'");
                
                if($updateData)
                {
                    echo json_encode(["success"=>"Post mis à jour !"]);
                    return;
                } else {
                    echo json_encode(["success"=>"Veuillez vérifier les données saisies !"]);
                    return;
                }                
                break;

                case "DELETE":
                    $path= explode('/', $_SERVER["REQUEST_URI"]);
                    //echo "display postid : ".$path[4]; die;

                    $result = mysqli_query($db_conn, "DELETE FROM posts WHERE id='$path[4]'");
                    if($result)
                    {
                        echo json_encode(["success"=>"Post supprimé !"]);
                        return;
                    } else {
                        echo json_encode(["success"=>"Veuillez vérifier les données !"]);
                        return;
                    }

                break;
    }

?>