<?php
session_start();
$correctPassword = 'hardboiledeggsgohard'; // Set your secret password here

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $password = $_POST['password'];
    if ($password == $correctPassword) {
        $_SESSION['authenticated'] = true;
        header('Location: redirect.html'); // Redirect to the target page
        exit();
    } else {
        header('Refresh: 1; URL=calculator.php'); // Redirect back to the login page after 2 seconds
    }
}
?>