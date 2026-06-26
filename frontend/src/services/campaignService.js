import api from './api';

const campaignService = {
  createCampaign: (campaign) => {
    return api.post('/api/campaigns/', campaign);
  },
  getCampaigns: () => {
    return api.get('/api/campaigns/');
  },
  getCampaign: (id) => {
    return api.get(`/api/campaigns/${id}`);
  },
  updateCampaign: (id, campaign) => {
    return api.put(`/api/campaigns/${id}`, campaign);
  },
  deleteCampaign: (id) => {
    return api.delete(`/api/campaigns/${id}`);
  },
};

export default campaignService;
