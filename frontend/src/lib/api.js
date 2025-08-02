import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUpUser = async (userData) => {
  const res = await api.post('/api/v1/auth/signup', userData);
  return res.data;
};

export const signInUser = async (credentials) => {
  const res = await api.post('/api/v1/auth/signin', credentials);
  return res.data;
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.authorization;
  }
};



export const forgotPassword = async (email) => {
  const res = await api.post("/api/v1/auth/forgot-password", { email });
  return res.data;
};

export const verifyCode = async (email, code) => {
  const res = await api.post("/api/v1/auth/verify-code", { email, code });
  return res.data;
};

export const resetPassword = async (email, code, newPassword) => {
  const res = await api.post("/api/v1/auth/reset-password", {
    email,
    code,
    newPassword,
  });
  return res.data;
};

export const checkEmailVerified = async (email) => {
  const res = await api.get(`/api/v1/auth/is-verified`, {
    params: { email },
  });
  return res.data;
};
