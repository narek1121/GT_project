import axios from 'axios';

interface Credentials { username: string; password: string; }

export async function login(creds: Credentials) {
  const resp = await axios.post('/api/auth/login/', creds);
  return resp.data;
}

export async function register(creds: Credentials) {
  const resp = await axios.post('/api/auth/register/', creds);
  return resp.data;
}
