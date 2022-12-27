import http from './httpService';

export function appUpdate(version) {
  return http.post("/update", {version:version});
}