import http from './httpService';

export function getSearchBook(search, limit = null) {
  let url = '/book-search/' + search;
  if (limit) url += '?limit=' + limit;
  return http.get(url);
}

export function getSearchBookByCategory(category_id, limit = null) {
  let url = '/book-search/category/' + category_id;
  if (limit) url += '?limit=' + limit;
  return http.get(url);
}

export function getSearchBookByTitle(search, limit = null) {
  let url = '/book-search/title/' + search;
  if (limit) url += '?limit=' + limit;
  return http.get(url);
}

export function getSearchBookByAuther(search, limit = null) {
  let url = '/book-search/auther/' + search;
  if (limit) url += '?limit=' + limit;
  return http.get(url);
}
