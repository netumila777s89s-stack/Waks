import api from './api';

const authService = {
  register: (username, email, password) => {
    return api.post('/api/auth/register', { username, email, password });
  },
  login: (email, password) => {
    return api.post('/api/auth/login', { email, password });
  },
  logout: () => {
    localStorage.removeItem('access_token');
  },
};

export default authService;
