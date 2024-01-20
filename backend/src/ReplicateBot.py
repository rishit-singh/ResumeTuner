import replicate
from typing import Any

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

class Message:
    def __init__(self, role: str, content: str):
        self.Role: str = role
        self.Content: str = content

    def __str__(self) -> str:
        return str()

class ReplicateBot:
    def __init__(self, model: str, apiKey: str):
        self.Model: str = model
        self.APIKey: str = apiKey
        self.MessageQueue: Queue = Queue()
        self.Results: list = []

    def Prompt(self, message: Message):
        self.MessageQueue.Enqueue(message)

    def Run(self):
        while (not(self.MessageQueue.IsEmpty())):
            self.Results.append(replicate.run(self.Model, input= {
                "prompt": self.MessageQueue.Dequeue() 
            }))
