@echo off
cls
echo Iniciando script Node...

REM 1) npm install
echo.
echo Instalando dependências...
call npm install || goto error

REM 2) node index.js
echo.
echo Executando index.js...
call node src/index.js || goto error

echo.
echo Tudo pronto!
pause >nul
exit /b 0

:error
echo.
echo Algo deu errado. Pressione qualquer tecla para sair...
pause >nul
exit /b 1