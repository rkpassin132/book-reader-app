import http from './httpService';

export function getBookCategories(limit = null) {
  let url = '/book-category';
  if (limit != null) url += '?limit=' + limit;
  return http.get(url);
}
