from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.campaign import CampaignStatus, Platform

class CampaignCreate(BaseModel):
    title: str
    description: Optional[str] = None
    platform: Platform = Platform.BOTH
    template_text: str
    scheduled_at: Optional[datetime] = None

class CampaignUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    template_text: Optional[str] = None
    status: Optional[CampaignStatus] = None
    scheduled_at: Optional[datetime] = None

class CampaignResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    platform: Platform
    status: CampaignStatus
    template_text: str
    scheduled_at: Optional[datetime]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
