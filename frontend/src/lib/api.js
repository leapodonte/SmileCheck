import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Sign up user
export const signUpUser = async (userData) => {
  const res = await api.post('/api/v1/auth/signup', userData);
  return res.data;
};

// Sign in user
export const signInUser = async (credentials) => {
  const res = await api.post('/api/v1/auth/signin', credentials);
  return res.data;
};

// Add token to request headers for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.authorization;
  }
};

// Google Sign In
export const googleSignIn = async (credential) => {
  const res = await api.post('/api/v1/auth/google', { credential });
  return res.data;
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