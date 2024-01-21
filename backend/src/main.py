import os
import sys
import json
import threading

from ResumeBot import ResumeBot
from ReplicateBot import ReplicateBot, Message
from PDFExtractor import PDFExtractor

bot = ResumeBot("mistralai/mixtral-8x7b-instruct-v0.1", os.getenv("REPLICATEKEY"))

pdf = PDFExtractor.extract_text_from_pdf(open(sys.argv[1], 'rb').read())

bot.Initialize(pdf)

