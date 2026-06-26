import httpx
from app.config import settings
from typing import Optional

class InstagramService:
    def __init__(self):
        self.access_token = settings.instagram_access_token
        self.business_account_id = settings.instagram_business_account_id
        self.base_url = "https://graph.instagram.com"
    
    async def send_message(self, recipient_id: str, message_text: str) -> Optional[str]:
        """
        Отправка DM сообщения через Instagram
        Returns: external_id сообщения или None если ошибка
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/v18.0/{self.business_account_id}/messages",
                    json={
                        "recipient": {"id": recipient_id},
                        "message": {"text": message_text}
                    },
                    headers={"Authorization": f"Bearer {self.access_token}"}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data.get("message_id")
                return None
        except Exception as e:
            print(f"Error sending Instagram message: {e}")
            return None
    
    async def get_message_status(self, external_id: str) -> Optional[str]:
        """
        Получение статуса сообщения
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/v18.0/{external_id}",
                    params={"access_token": self.access_token}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data.get("status")
                return None
        except Exception as e:
            print(f"Error getting message status: {e}")
            return None
