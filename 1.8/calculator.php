<!DOCTYPE html>
<html lang="en">
<head>
  	<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HNX44KJE7L"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HNX44KJE7L');
</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator Project</title>
    <link rel="stylesheet" href="calculator.css">
</head>
<body>
    <div class="calculator">
        <form action="validate.php" method="POST">
            <input type="text" name="password" id="display">
            <div class="keys">
                <!-- Numeric Buttons -->
                <button type="button" onclick="press('1')">1</button>
                <button type="button" onclick="press('2')">2</button>
                <button type="button" onclick="press('3')">3</button>
                <button type="button" onclick="press('4')">4</button>
                <button type="button" onclick="press('5')">5</button>
                <button type="button" onclick="press('6')">6</button>
                <button type="button" onclick="press('7')">7</button>
                <button type="button" onclick="press('8')">8</button>
                <button type="button" onclick="press('9')">9</button>
                <button type="button" onclick="press('0')">0</button>
                <button type="button" onclick="clearDisplay()">C</button>
                <button type="submit">Enter</button>
            </div>
        </form>
    </div>

    <script>
        function press(num) {
            document.getElementById('display').value += num;
        }

        function clearDisplay() {
            document.getElementById('display').value = '';
        }
    </script>
</body>
</html>
