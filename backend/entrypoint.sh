@echo off
REM RAG System Setup Script for Windows

echo ==========================================
echo   RAG System - Automated Setup (Windows)
echo ==========================================
echo.

REM Check Python installation
echo Checking Python version...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.9+ from https://www.python.org
    pause
    exit /b 1
)

for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
echo [OK] Found Python %PYTHON_VERSION%

REM Create virtual environment
echo.
echo Creating virtual environment...
if exist venv (
    echo [WARNING] Virtual environment already exists
    set /p RECREATE="Remove and recreate? (y/n): "
    if /i "%RECREATE%"=="y" (
        rmdir /s /q venv
        python -m venv venv
        echo [OK] Virtual environment recreated
    )
) else (
    python -m venv venv
    echo [OK] Virtual environment created
)

REM Activate virtual environment
echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo [OK] Virtual environment activated

REM Upgrade pip
echo.
echo Upgrading pip...
python -m pip install --upgrade pip >nul 2>&1
echo [OK] Pip upgraded

REM Install dependencies
echo.
echo Installing dependencies (this may take a few minutes)...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed

REM Create .env file
echo.
if not exist .env (
    echo Creating .env file...
    copy .env.example .env >nul
    echo [OK] .env file created
    echo [WARNING] Please edit .env and add your GROQ_API_KEY
) else (
    echo [WARNING] .env file already exists
)

REM Create logs directory
echo.
echo Creating logs directory...
if not exist logs mkdir logs
echo [OK] Logs directory created

REM Test imports
echo.
echo Testing imports...
python -c "import fastapi; import sentence_transformers; import faiss; import groq; from PyPDF2 import PdfReader; print('[OK] All imports successful!')" 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Some packages failed to import
    pause
    exit /b 1
)

REM Print next steps
echo.
echo ==========================================
echo   Setup Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Edit .env and add your GROQ_API_KEY
echo 2. Activate virtual environment: venv\Scripts\activate
echo 3. Run the server: python main.py
echo 4. Test the API: python test_api.py
echo.
echo API will be available at: http://localhost:8000
echo API docs: http://localhost:8000/docs
echo.
echo Happy coding! 🚀
echo.
pause