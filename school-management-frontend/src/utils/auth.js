import { jwtDecode } from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    return decoded;
  } catch (e) {
    logout();
    return null;
  }
}

export function logout() {
  localStorage.removeItem('token');
}