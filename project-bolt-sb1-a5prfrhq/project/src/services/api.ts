const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Helper function to get CSRF token
const getCSRFToken = () => {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// API call helper
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken() || '',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiCall('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name: string, email: string, password: string, confirm_password: string) => {
    return apiCall('/auth/register/', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirm_password }),
    });
  },

  logout: async () => {
    return apiCall('/auth/logout/', {
      method: 'POST',
    });
  },

  getProfile: async () => {
    return apiCall('/auth/profile/');
  },
};

// Shayari API calls
export const shayariAPI = {
  search: async (query: string) => {
    return apiCall(`/shayari/search/?q=${encodeURIComponent(query)}`);
  },

  getAll: async () => {
    return apiCall('/shayari/all/');
  },

  generate: async (word: string) => {
    return apiCall('/shayari/generate-shayari/', {
      method: 'POST',
      body: JSON.stringify({ word }),
    });
  },
};