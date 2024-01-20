import os
import sys
import json
import threading

from ReplicateBot import ReplicateBot, Message

bot = ReplicateBot("mistralai/mixtral-8x7b-instruct-v0.1", os.getenv("REPLICATEKEY"))

bot.Prompt(Message("user", sys.argv[1]))

def Main():
    bot.Run()

t = threading.Thread(target=Main)
t.run()

while (True):
    print(bot.States[-1].Result)
