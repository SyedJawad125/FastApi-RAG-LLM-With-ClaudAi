# from PyPDF2 import PdfReader

# def extract_text_from_pdf(file):
#     """Extract text and page count from uploaded PDF file."""
#     reader = PdfReader(file)
#     text = ""
#     for page in reader.pages:
#         if page.extract_text():
#             text += page.extract_text()
#     pages_processed = len(reader.pages)
#     return text, pages_processed



# def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200):
#     """Smart chunking with sentence boundary detection"""
#     chunks = []
#     start = 0
#     while start < len(text):
#         end = start + chunk_size
#         # Try to break at sentence boundary
#         sentence_end = text.rfind('.', start, end)
#         if sentence_end != -1:
#             end = sentence_end + 1
#         chunks.append(text[start:end])
#         start = end - overlap
#     return chunks




from PyPDF2 import PdfReader
from io import BytesIO

def extract_text_from_pdf(file):
    """Extract text and page count from uploaded PDF file."""
    try:
        # Read the file content into BytesIO
        if hasattr(file, 'read'):
            content = file.read()
            file_obj = BytesIO(content)
        else:
            file_obj = file
            
        reader = PdfReader(file_obj)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"  # Add newline between pages
        
        pages_processed = len(reader.pages)
        
        if not text.strip():
            raise ValueError("No text could be extracted from PDF")
            
        return text, pages_processed
        
    except Exception as e:
        raise ValueError(f"PDF processing error: {str(e)}")


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200):
    """Smart chunking with sentence boundary detection"""
    if not text or not text.strip():
        return []
        
    chunks = []
    start = 0
    text_len = len(text)
    
    while start < text_len:
        end = min(start + chunk_size, text_len)
        
        # Try to break at sentence boundary (only if not at the end)
        if end < text_len:
            sentence_end = text.rfind('.', start, end)
            if sentence_end != -1 and sentence_end > start:
                end = sentence_end + 1
        
        chunk = text[start:end].strip()
        if chunk:  # Only add non-empty chunks
            chunks.append(chunk)
        
        # Move start position with overlap
        start = end - overlap if end < text_len else text_len
        
    return chunks