from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.message import Message
from app.models.user import User
from app.schemas.message import MessageResponse
from app.utils.security import get_current_user
from app.tasks.messaging import send_message_task

router = APIRouter()

@router.post("/send", response_model=MessageResponse)
def send_message(
    campaign_id: int,
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Валидация кампании и контакта
    from app.models.campaign import Campaign
    from app.models.contact import Contact
    
    campaign = db.query(Campaign).filter(
        (Campaign.id == campaign_id) & (Campaign.owner_id == current_user.id)
    ).first()
    
    contact = db.query(Contact).filter(
        (Contact.id == contact_id) & (Contact.owner_id == current_user.id)
    ).first()
    
    if not campaign or not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Кампания или контакт не найдены"
        )
    
    # Создание сообщения
    message = Message(
        campaign_id=campaign_id,
        contact_id=contact_id,
        user_id=current_user.id,
        platform=campaign.platform,
        content=campaign.template_text
    )
    
    db.add(message)
    db.commit()
    db.refresh(message)
    
    # Отправка в Celery
    send_message_task.delay(message.id)
    
    return message

@router.get("/campaign/{campaign_id}", response_model=List[MessageResponse])
def get_campaign_messages(
    campaign_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    from app.models.campaign import Campaign
    
    campaign = db.query(Campaign).filter(
        (Campaign.id == campaign_id) & (Campaign.owner_id == current_user.id)
    ).first()
    
    if not campaign:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Кампания не найдена"
        )
    
    messages = db.query(Message).filter(Message.campaign_id == campaign_id).all()
    return messages
