import http from './httpService';

export function getUser() {
  return http.get('/user');
}

export function updateUser(user) {
  return http.patch('/user', user);
}
