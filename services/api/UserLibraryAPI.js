import http from './httpService';

export function getAllUserLibrary() {
  return http.get('/library');
}

export function isUserBookLibrary(book_id) {
  return http.get('/library/'+book_id);
}

export function setUserLibrary(book_id) {
  return http.post('/library/'+book_id);
}

export function deleteUserLibrary(book_id) {
  return http.delete('/library/'+book_id);
}
