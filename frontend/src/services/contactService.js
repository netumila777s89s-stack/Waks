import api from './api';

const contactService = {
  createContact: (contact) => {
    return api.post('/api/contacts/', contact);
  },
  getContacts: () => {
    return api.get('/api/contacts/');
  },
  getContact: (id) => {
    return api.get(`/api/contacts/${id}`);
  },
  updateContact: (id, contact) => {
    return api.put(`/api/contacts/${id}`, contact);
  },
  deleteContact: (id) => {
    return api.delete(`/api/contacts/${id}`);
  },
};

export default contactService;
