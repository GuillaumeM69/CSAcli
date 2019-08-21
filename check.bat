@echo off
::Test If script has Admin Priviledges/is elevated
net session >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
 ECHO you are Administrator
) ELSE (
 ECHO you are NOT Administrator. Exiting...
 PING 127.0.0.1 > NUL 2>&1
 EXIT /B 1
)
