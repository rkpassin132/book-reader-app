import http from './httpService';

export function getBooks() {
  return http.get('/books');
}

export function getBookById(bookId) {
  return http.get('/books/book_id/' + bookId);
}

export function bookBuyLink(book_id) {
  return http.get('/books/buyLink/' + book_id);
}

export function getRecommendedBooks(limit = null) {
  let url = '/books/recommended';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}

export function getTrendingBooks(limit = null) {
  let url = '/books/trending';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}

export function getNewlyBooks(limit = null) {
  let url = '/books/newly';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}

export function getBiographyBooks(limit = null) {
  let url = '/books/biography';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}

export function getMotivationBooks(limit = null) {
  let url = '/books/motivation';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}

export function getHistoryBooks(limit = null) {
  let url = '/books/history';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}

export function getScienceBooks(limit = null) {
  let url = '/books/science';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}

export function getLibraryBooks(limit = null) {
  let url = '/books/library';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}
