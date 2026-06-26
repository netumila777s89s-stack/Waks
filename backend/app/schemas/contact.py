from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContactCreate(BaseModel):
    name: str
    whatsapp_number: Optional[str] = None
    instagram_username: Optional[str] = None
    email: Optional[str] = None
    tags: Optional[str] = None

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    whatsapp_number: Optional[str] = None
    instagram_username: Optional[str] = None
    email: Optional[str] = None
    tags: Optional[str] = None

class ContactResponse(BaseModel):
    id: int
    name: str
    whatsapp_number: Optional[str]
    instagram_username: Optional[str]
    email: Optional[str]
    tags: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
