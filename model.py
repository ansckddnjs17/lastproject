from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Intro(BaseModel):
    id: Optional[int] = None
    name: str
    message: str
    timestamp: Optional[datetime] = None
