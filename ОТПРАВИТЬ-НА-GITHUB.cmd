@echo off
chcp 65001 >nul
title Отправка на GitHub
cd /d "%~dp0"
echo === Отправляю репозиторий на GitHub ===
echo.
git push --force -u origin main
echo.
if %ERRORLEVEL%==0 (
  echo ГОТОВО. Файлы на GitHub.
) else (
  echo НЕ ПОЛУЧИЛОСЬ. Скопируй текст выше и пришли в чат.
)
echo.
pause