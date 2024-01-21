import replicate
import requests
from typing import Any, Callable
import asyncio
import uuid

class Queue:
    def __init__(self, initList: list[Any] = []):
        self.Buffer: list[Any] = initList
    
    def IsEmpty(self) -> bool:
        return (len(self.Buffer) < 1)

    def Enqueue(self, item: Any):
        self.Buffer.append(item)
    
    def Dequeue(self) -> Any:
        if (not(self.IsEmpty())):
            item: str = self.Buffer[0]
            
            self.Buffer.remove(self.Buffer[0])

            return item

PromptFormats: dict[str, str] = {
    "user": """[INST]{}[/INST]""",
    "assistant": """{}"""
}

class Message:
    def __init__(self, role: str, content: str):
        self.Role: str = role
        self.Content: str = content

    def __str__(self) -> str:
        return PromptFormats[self.Role].format(self.Content)

class PromptState:
    def __init__(self):
        self.Messages: list[Message] = []
        self.ID = str(uuid.uuid4())
        self.Result: list[str] = []
    
    def __str__(self):
        joined = str()

        for message in self.Messages:
            joined += f"{str(message)}\n"

        return joined

    def AddMessage(self, message: Message):
        print(f"Message Added {message}")
        self.Messages.append(message)

    def AppendResult(self, token: str):
        self.Result.append(token) 

    def FinalizeCurrentResult(self):
        self.Messages.append(Message("assistant", str().join(self.Result)))       
    
class ReplicateBot:
    def __init__(self, model: str, apiKey: str):
        self.Model = replicate.models.get(model)
        self.ModelVersion = self.Model.versions.list()[-1]
        self.APIKey: str = apiKey
        self.MessageQueue: Queue = Queue()
        self.Results: list = []
        self.PromptStr: str = ""
        self.States: list[PromptState] = []

    def Prompt(self, message: Message):
        self.MessageQueue.Enqueue(message)

    def FetchStreamTokens(self, url: str, callback: Callable):
        session = requests.Session()

        response = session.get(url, stream=True)

        print(response.content)
   
    def Run(self):
        self.States.append(PromptState())

        def Callback(token):
            self.States[-1].AppendResult(token) 

        def DoneCallback(context):
            self.States[-1].FinalizeCurrentResult()
            self.PromptStr = str(self.States)

        while (not(self.MessageQueue.IsEmpty())):
            message = self.MessageQueue.Dequeue()

            self.States[-1].AddMessage(message)

            self.PromptStr += f"{str(message)}\n"

            for event in replicate.stream("meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3", input = {
                "prompt": self.PromptStr
            }, ):
               Callback(event.data)

            DoneCallback(None)
