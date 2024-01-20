import os
import sys
from ReplicateBot import ReplicateBot

bot = ReplicateBot("mistralai/mixtral-8x7b-instruct-v0.1", os.getenv("REPLICATEKEY"))

bot.Prompt("Hello Bot.")
bot.Run()

print(bot.Results)

 
