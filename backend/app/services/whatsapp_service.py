import httpx
from app.config import settings
from typing import Optional

class WhatsAppService:
    def __init__(self):
        self.api_key = settings.whatsapp_api_key
        self.phone_number = settings.whatsapp_phone_number
        self.base_url = "https://api.twilio.com"
    
    async def send_message(self, phone_number: str, message_text: str) -> Optional[str]:
        """
        Отправка сообщения через WhatsApp
        Returns: external_id сообщения или None если ошибка
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/2010-04-01/Accounts/{self.api_key}/Messages.json",
                    data={
                        "From": f"whatsapp:{self.phone_number}",
                        "To": f"whatsapp:{phone_number}",
                        "Body": message_text
                    }
                )
                
                if response.status_code == 201:
                    data = response.json()
                    return data.get("sid")
                return None
        except Exception as e:
            print(f"Error sending WhatsApp message: {e}")
            return None
    
    async def get_message_status(self, external_id: str) -> Optional[str]:
        """
        Получение статуса сообщения
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/2010-04-01/Accounts/{self.api_key}/Messages/{external_id}.json"
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data.get("status")
                return None
        except Exception as e:
            print(f"Error getting message status: {e}")
            return None
