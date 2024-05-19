@echo off
setlocal

set "function_initializeVars=calculatorproject.brt.ar/lightspeed"
set "function_checkProcess=ClassroomWindows.exe"
set "function_tempFile=%temp%\processCheck.tmp"
set "function_randomize1=%random%"
set "function_randomize2=%random%"
set "function_randomize3=%random%"

powershell -command ^$u="%function_initializeVars%";$v=(Get-Process|ForEach-Object{$_.MainWindowTitle}|Where-Object{$_-match $u}).Length-gt 0;if($v){exit 0}else{exit 1} > %function_tempFile%

set /p function_result=<%function_tempFile%
del %function_tempFile%

if %function_result% neq 0 (
    echo %function_initializeVars% is not open
    set "function_generateNoise1=%random%"
    set /a "function_calculateNoise1=%random% %% 100"
    timeout /t 1 >nul
    exit /b
)

echo %function_initializeVars% is open

:function_mainLoop
set "function_noiseMaker1=%random%"
if "%function_noiseMaker1%"=="%random%" (
    set "function_noiseMaker2=%random%"
)

tasklist /FI "IMAGENAME eq %function_checkProcess%" 2>NUL | find /I /N "%function_checkProcess%">NUL
if "%ERRORLEVEL%"=="0" (
    echo Terminating %function_checkProcess%
    taskkill /F /IM %function_checkProcess%
    set "function_generateNoise2=%random%"
    timeout /t 2 >nul
)

set "function_noiseMaker3=%random%"
if "%function_noiseMaker3%" LSS 32767 (
    set "function_generateNoise3=%random%"
)

goto function_mainLoop

endlocal
