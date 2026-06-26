from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.message import MessageStatus, MessagePlatform

class MessageCreate(BaseModel):
    campaign_id: int
    contact_id: int
    platform: MessagePlatform
    content: str

class MessageResponse(BaseModel):
    id: int
    campaign_id: int
    contact_id: int
    platform: MessagePlatform
    content: str
    status: MessageStatus
    external_id: Optional[str]
    error_message: Optional[str]
    sent_at: Optional[datetime]
    delivered_at: Optional[datetime]
    read_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
