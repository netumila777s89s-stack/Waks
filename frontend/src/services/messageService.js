import api from './api';

const messageService = {
  sendMessage: (campaignId, contactId) => {
    return api.post('/api/messages/send', null, {
      params: { campaign_id: campaignId, contact_id: contactId }
    });
  },
  getCampaignMessages: (campaignId) => {
    return api.get(`/api/messages/campaign/${campaignId}`);
  },
};

export default messageService;
