import http from './httpService';

export function getBookLikes(book_id) {
  return http.get('/book-like/' + book_id);
}

export function getBookLikeCount(book_id) {
  return http.get('/book-like/count/' + book_id);
}

export function getIsBookLiked(book_id) {
  return http.get('/book-like/isliked/' + book_id);
}

export function setBookLike(book_id) {
  return http.post('/book-like/' + book_id);
}

export function removeBookLike(book_id) {
  return http.delete('/book-like/' + book_id);
}
