from ReplicateBot import ReplicateBot

class ResumeBot:
    def __init__(self, model: str, apiKey: str):
        self.Bot: ReplicateBot = ReplicateBot(model, apiKey)

    def Run(self):
        self.Bot.Run()

    def Tune(self, jobDescription):
        self.Bot.Prompt(f"Tune and recreate this resume to match this {jobDescription}.")

    def Initialize(self, buffer):
        self.Bot.Prompt("You are a resume analyzer. I will provide you a resume in form of text and then a job description. You must analyze and understand the context of the resume. Compare the resume to the job description and give each part of it a score on how relevant it is for the job. Only generate the info when the resume is provided. Respond with OK only if you understand")
        self.Bot.Prompt(f"Heres the resume \n{buffer}. Dont generate any info yet, wait for the job description.")


