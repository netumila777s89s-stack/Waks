from app.celery_app import celery_app
from app.database import SessionLocal
from app.models.message import Message, MessageStatus
from app.services.whatsapp_service import WhatsAppService
from app.services.instagram_service import InstagramService
from datetime import datetime
import asyncio

whatsapp_service = WhatsAppService()
instagram_service = InstagramService()

@celery_app.task
def send_message_task(message_id: int):
    db = SessionLocal()
    try:
        message = db.query(Message).filter(Message.id == message_id).first()
        
        if not message:
            return {"status": "error", "message": "Message not found"}
        
        contact = message.contact
        
        if message.platform.value == "whatsapp":
            if contact.whatsapp_number:
                external_id = asyncio.run(whatsapp_service.send_message(
                    contact.whatsapp_number,
                    message.content
                ))
                
                if external_id:
                    message.external_id = external_id
                    message.status = MessageStatus.SENT
                    message.sent_at = datetime.utcnow()
                else:
                    message.status = MessageStatus.FAILED
                    message.error_message = "Failed to send WhatsApp message"
        
        elif message.platform.value == "instagram":
            if contact.instagram_username:
                external_id = asyncio.run(instagram_service.send_message(
                    contact.instagram_username,
                    message.content
                ))
                
                if external_id:
                    message.external_id = external_id
                    message.status = MessageStatus.SENT
                    message.sent_at = datetime.utcnow()
                else:
                    message.status = MessageStatus.FAILED
                    message.error_message = "Failed to send Instagram message"
        
        db.commit()
        return {"status": "success", "message_id": message_id}
    
    except Exception as e:
        message = db.query(Message).filter(Message.id == message_id).first()
        if message:
            message.status = MessageStatus.FAILED
            message.error_message = str(e)
            db.commit()
        return {"status": "error", "message": str(e)}
    
    finally:
        db.close()

@celery_app.task
def check_message_status_task(message_id: int):
    db = SessionLocal()
    try:
        message = db.query(Message).filter(Message.id == message_id).first()
        
        if not message or not message.external_id:
            return
        
        if message.platform.value == "whatsapp":
            status = asyncio.run(whatsapp_service.get_message_status(message.external_id))
        else:
            status = asyncio.run(instagram_service.get_message_status(message.external_id))
        
        if status:
            message.status = MessageStatus(status)
            if status == MessageStatus.DELIVERED:
                message.delivered_at = datetime.utcnow()
            elif status == MessageStatus.READ:
                message.read_at = datetime.utcnow()
            
            db.commit()
    
    except Exception as e:
        print(f"Error checking message status: {e}")
    
    finally:
        db.close()
