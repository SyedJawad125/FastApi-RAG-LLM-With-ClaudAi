"""
Test script for RAG API endpoints
Run this after starting the server to verify everything works
"""

import requests
import json
import time
from pathlib import Path

BASE_URL = "http://localhost:8000"

def print_section(title):
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def test_root():
    """Test root endpoint"""
    print_section("Testing Root Endpoint")
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    return response.status_code == 200

def test_health():
    """Test health endpoint"""
    print_section("Testing Health Endpoint")
    response = requests.get(f"{BASE_URL}/rag/health")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    return response.status_code == 200

def test_upload(pdf_path=None):
    """Test file upload"""
    print_section("Testing File Upload")
    
    if pdf_path and Path(pdf_path).exists():
        with open(pdf_path, 'rb') as f:
            files = {'file': (Path(pdf_path).name, f, 'application/pdf')}
            response = requests.post(f"{BASE_URL}/rag/upload", files=files)
    else:
        print("⚠️  No PDF file provided - skipping upload test")
        print("   To test upload, run: python test_api.py /path/to/your/file.pdf")
        return None
    
    print(f"Status: {response.status_code}")
    if response.status_code == 201:
        print("✅ Upload successful!")
        print(json.dumps(response.json(), indent=2))
        return True
    else:
        print("❌ Upload failed!")
        print(response.text)
        return False

def test_ask_question(session_id=None):
    """Test asking a question"""
    print_section("Testing Ask Question")
    
    payload = {
        "query": "What is the main topic discussed in the documents?",
        "max_context_items": 3
    }
    
    if session_id:
        payload["session_id"] = session_id
    
    response = requests.post(
        f"{BASE_URL}/rag/ask",
        json=payload
    )
    
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print("✅ Question answered!")
        print(f"\nQuery: {payload['query']}")
        print(f"\nAnswer: {data['answer']}")
        print(f"\nSession ID: {data['session_id']}")
        print(f"Sources used: {data['sources_count']}")
        print(f"Processing time: {data['processing_time']}s")
        return data['session_id']
    else:
        print("❌ Question failed!")
        print(response.text)
        return None

def test_session_continuity(session_id):
    """Test conversation continuity"""
    print_section("Testing Conversation Continuity")
    
    questions = [
        "Can you elaborate on that?",
        "What are the key points?",
    ]
    
    for i, question in enumerate(questions, 1):
        print(f"\n--- Follow-up Question {i} ---")
        payload = {
            "query": question,
            "session_id": session_id,
            "max_context_items": 2
        }
        
        response = requests.post(f"{BASE_URL}/rag/ask", json=payload)
        
        if response.status_code == 200:
            data = response.json()
            print(f"Q: {question}")
            print(f"A: {data['answer'][:200]}...")
            print(f"Turn count: {data['metadata'].get('turn_count', 'N/A')}")
        else:
            print(f"❌ Failed: {response.text}")
            return False
        
        time.sleep(0.5)  # Small delay between requests
    
    return True

def test_session_info(session_id):
    """Test getting session info"""
    print_section("Testing Session Info")
    
    response = requests.get(f"{BASE_URL}/rag/session/{session_id}")
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200: