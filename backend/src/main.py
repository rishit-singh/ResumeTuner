import os
import sys
import json
import threading
import uvicorn
import asyncio

from ReplicateBot import ReplicateBot, Message
from ResumeBot import ResumeBot
from PDFExtractor import PDFExtractor

from dotenv import load_dotenv
load_dotenv()

# from ReplicateBot import ReplicateBot, Message

# bot = ReplicateBot("mistralai/mixtral-8x7b-instruct-v0.1", os.getenv("REPLICATE_API_TOKEN"))

# bot.Prompt(Message("user", sys.argv[1]))

# def Main():
#     bot.Run()

# t = threading.Thread(target=Main)
# t.run()

# while (True):
#     print(bot.States[-1].Result)


bot: ResumeBot = ResumeBot("mistralai/mixtral-8x7b-instruct-v0.1", os.environ["REPLICATE_API_TOKEN"]) 

# bot.Initialize(PDFExtractor.extract_text_from_pdf(open(sys.argv[1], 'rb').read())) # Initialize the llm with the resume


async def main():
    config = uvicorn.Config("api:app", host="0.0.0.0", port=8000)
    server = uvicorn.Server(config)
    await server.serve()

if __name__ == "__main__":
    asyncio.run(main())
    