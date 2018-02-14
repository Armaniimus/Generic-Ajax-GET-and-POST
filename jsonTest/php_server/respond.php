<?php


// print_r($_GET);
if (isset($_POST) ) {
    if (isset($_POST["id"]) ) {
        echo "id => " . $_POST["id"];

    } else if (isset($_GET["json"] ) ) {
        $temp = json_decode(file_get_contents('php://input'), true);
        $temp["monkey"] = "awsome";
        echo json_encode($temp);
    }
}
else if (isset($_GET["id"])) {
    echo "id => " . $_GET["id"] . $_GET["name"];
}
else {
    echo "received message";
}

?>
