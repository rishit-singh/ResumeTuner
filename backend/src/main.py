import os
import sys
# from ReplicateBot import ReplicateBot
from PDFExtractor import PDFExtractor
'''
bot = ReplicateBot("mistralai/mixtral-8x7b-instruct-v0.1", os.getenv("REPLICATEKEY"))

bot.Prompt(sys.argv[1])
bot.Run()

print(bot.Results)
'''

# Test PDFExtractor
# Load a PDF file into a buffer (replace 'your_pdf_file.pdf' with your actual file)
with open('tests\sample_resume.pdf', 'rb') as file:
    pdf_buffer = file.read()

# Create an instance of PDFExtractor
pdf_extractor = PDFExtractor()

# Extract text from the PDF buffer
extracted_text = pdf_extractor.extract_text_from_pdf(pdf_buffer)

# Print the extracted text
print(extracted_text)