<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
   


        $sql = "SELECT * FROM blogs";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {

    
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $blogs = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($blogs);
        break;
    case "POST":
        $blog = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO blogs(id,title,img,content)VALUES(null,:title,:img,:content )";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
    
        $stmt->bindParam(':content', $blog->content);
        $stmt->bindParam(':title', $blog->title);
        $stmt->bindParam(':img', $blog->img);
        

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

  

        case "PUT":
            $blog = json_decode( file_get_contents('php://input') );
            $sql = "UPDATE blogs SET   title =:title, content =:content ,  img =:img WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $blog->id);
            $stmt->bindParam(':content', $blog->content);
            $stmt->bindParam(':title', $blog->title);
            $stmt->bindParam(':img', $blog->img);
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
  
            break;
    



        case "DELETE":
            $sql = "DELETE FROM blogs WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
    
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;













}