from PyPDF2 import PdfReader

def extract_text_from_pdf(file):
    """Extract text and page count from uploaded PDF file."""
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        if page.extract_text():
            text += page.extract_text()
    pages_processed = len(reader.pages)
    return text, pages_processed



def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200):
    """Smart chunking with sentence boundary detection"""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        # Try to break at sentence boundary
        sentence_end = text.rfind('.', start, end)
        if sentence_end != -1:
            end = sentence_end + 1
        chunks.append(text[start:end])
        start = end - overlap
    return chunks