import os
import sys
import json
import threading
from dotenv import load_dotenv
load_dotenv()
from ReplicateBot import ReplicateBot, Message
from ResumeBot import ResumeBot
from PDFExtractor import PDFExtractor

os.environ["REPLICATE_API_TOKEN"] = os.getenv("REPLICATEKEY")

bot: ResumeBot = ResumeBot("mistralai/mixtral-8x7b-instruct-v0.1", os.environ["REPLICATE_API_TOKEN"]) 

def Main():
    bot.Initialize(PDFExtractor.extract_text_from_pdf(open(sys.argv[1], 'rb').read())) # Initialize the llm with the resume
    bot.Tune("""
        After-school program facilitator for 6-12 year olds 

DO NOT APPLY UNLESS YOU HAVE A VULNERABLE SECTOR CHECK 



You will rejected immediately if you do not have a Vulnerable Sector Check - if you don't know what this is, please do not apply.


THIS JOB IS AN IMMEDIATE START SO REQUIRES A VSC 



Job Type: Part-Time, Contract (5-25 hours per week, 3-9 months with possibility of extension)
Shifts: Mostly after-school hours Monday-Friday, between 3pm-6pm with some options for shifts during the day.


Compensation: $25-$30 per hour, plus incentives!


Details: Must have vulnerable sector check! WiLL NOT BE INVITED TO INTERVIEW WITHOUT THIS


Location: Mississauga & Brampton


Job Description: X Movement is seeking facilitators/instructors to deliver fun and engaging, high-energy after-school programs in Peel Region Schools (Mississauga & Brampton).


Program Workshops are designed to support the holistic development of child wellness (Mind, Body, Social & Emotions). Instructors will be required to lead interactive workshops with children ages 4-12 years. Workshop activities include a variety of games, fitness challenges, mindfulness exercises, simple dances and teamwork activities. Facilitators will be provided with full training, equipment and workshop syllabus. 



Aftercare workshops take place in over 100 schools in Mississauga/Brampton, Monday-Friday, between the hours of 3:00pm-5:30pm. Some daytime shifts are available at a lower rate (8:30am-3:30pm). Background check required.


Qualifications:

Highly Energetic and Enthusiastic - able to engage young children (ages 4-12 years)
Excellent communication skills 
Problem Solving Skills - capacity to handle unexpected situations and quickly solve problems


Considered an asset:

Previous Experience working with children
Knowledge/background in children's development and wellness
CPR and First Aid Certification (asset but not required)
Drive w/ your own car (asset but not required)

    """) # Set the job description
    bot.Run() # Run the llm

    # print(bot.Bot.State) # serve this on one endpoint for the frontend to consume
    return

threading.Thread(target=Main).run()

for state in bot.Bot.States:
    print(state.Result)
    print("\n\n")