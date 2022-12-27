import http from './httpService';

export function authLogin(data) {
  return http.post('/auth/login', data);
}