import json
import threading
import uuid
from typing import Annotated
from pydantic import BaseModel
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import FileResponse, HTMLResponse

from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from PDFExtractor import PDFExtractor

from main import bot
#PDFExtractor.extract_text_from_pdf()

class JobDescriptionModel(BaseModel):
    job_description: str

description = "A website that helps you create a tailored resume for each and every job posting."

app = FastAPI(
    title="RESUMERIFT",
    description=description,
    redoc_url="/",
    version="1.0",
    )

origins = [
    "*",
]

# app.add_middleware(GZipMiddleware, minimum_size=500) # only gzip responses above 500 bytes

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get(
    "/test",
    description="For testing"
)
async def test():
    print(bot)
    return bot

@app.get(
    "/get_id",
    description="Get a unique identier for your API calls.",
    status_code=200
)
async def get_id():
    return uuid.uuid4()

@app.post(
    "/upload/resume",
    summary="Uploads a PDF file to server",
    description="Takes in a PDF file of a resume",
)
async def upload_resume(id:str, uploaded_file: UploadFile):
    
    print(uploaded_file)
    
    # parse pdf to string
    PDFstring = PDFExtractor.extract_text_from_pdf(uploaded_file.file.read())
    
    # send string to ReplicateBot
    bot.Initialize(PDFstring)
    
    # return {"file_size": str(file)}
    
    return {
        "pdfString" : PDFstring
    }
    

@app.post(
    "/upload/job",
    status_code=200
)
async def upload_job(id:str, desc: JobDescriptionModel):
    
    # Send job posting to the ReplicateBot thing
    bot.Tune(desc.job_description)
    print("Prompt tuned.")
    
    # run job info
    # bot.Run()
    
    # make thread a daemon so it shuts down when program ends
    t = threading.Thread(target=bot.Run)
    t.daemon = True
    t.start()
    
    print("after")
    
    return 
    

@app.get(
    "/job_state",
    description="Get the current text and state for a job position",
)
async def job_state(id: str):
    
    # for state in bot.Bot.States:
    #     print(state.Result)
    
    return {
        "state" : bot.Bot.States
    }
    
    # HARD TO IMPLEMENT
    
    return

# @app.get(
#     "/{subject}/{course_code}",
#     response_class=HTMLResponse,
#     summary="Returns all known information about a course."
# )
# async def return_course_info(subject, course_code):
    
#     return """
#         <h1>Coming soon!</h1>
#     """