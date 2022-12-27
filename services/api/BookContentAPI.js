import http from './httpService';

export function getBookPdf(book_id) {
  return http.get('/book-pdf/' + book_id);
}

export function getBookAudio(book_id) {
  return http.get('/book-audio/' + book_id);
}
