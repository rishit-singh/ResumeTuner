import fitz  # PyMuPDF library

class PDFExtractor:
    def __init__(self):
        pass

    @staticmethod
    def extract_text_from_pdf(buffer: bytes) -> str:
        """
        Extract text content from a PDF file using a buffer object.

        :param buffer: Bytes-like object containing the PDF file content.
        :return: String containing the extracted text.
        """
        text = ""

        try:
            # Open the PDF file from the buffer
            pdf_document = fitz.open(stream=buffer, filetype="pdf")

            # Iterate through each page and extract text
            for page_number in range(pdf_document.page_count):
                page = pdf_document[page_number]
                text += page.get_text()

            # Close the PDF document
            pdf_document.close()

        except Exception as e:
            # Handle exceptions (e.g., invalid PDF format)
            text = f"Error extracting text: {str(e)}"

        return text
