import replicate
import requests
from typing import Any
import asyncio
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

class ReplicateBot:
    def __init__(self, model: str, apiKey: str):
        self.Model = replicate.models.get(model)
        self.ModelVersion = self.Model.versions.list()[-1]
        self.APIKey: str = apiKey
        self.MessageQueue: Queue = Queue()
        self.Results: list = []
        self.PromptStr: str = ""
        self.PromptCount: int = 0

    def Prompt(self, message: Message):
        self.MessageQueue.Enqueue(message)

    def FetchTokens(self, url: str):

        pass   

    def Run(self):
        while (not(self.MessageQueue.IsEmpty())):
            self.PromptStr += str(self.MessageQueue.Dequeue())
            result = replicate.predictions.create(version=self.ModelVersion, input = {
                "prompt": self.PromptStr
            }, stream=True)

        asyncio.create_task(self.FetchTokens(self, result.urls["stream"])) 