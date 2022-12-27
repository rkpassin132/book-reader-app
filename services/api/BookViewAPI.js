import http from './httpService';

export function getBookViews(book_id) {
  return http.get('/book-view/' + book_id);
}
