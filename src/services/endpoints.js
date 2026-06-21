export const API_ENDPOINTS = {
  auth: {
    login: '/api/login',
    register: '/api/register',
  },
  users: '/api/users',
  messages: (recipient) => `/api/messages/${encodeURIComponent(recipient)}`,
};
