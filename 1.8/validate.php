<?php
session_start();

// Define the correct password
$correctPassword = 'hardboiledeggsgohard';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userInput = $_POST['password'];
    if ($userInput === $correctPassword) {
        $_SESSION['logged_in'] = true; // Set a session variable on successful login
        header('Location: redirect.html'); // Redirect to the content page
        exit;
    } else {
        echo "window.location.href = 'calculator.html';</script>";
    }
}
?>