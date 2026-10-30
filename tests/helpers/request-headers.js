export function requestHeaders(token) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  if (token) {
    headers.Cookie = `token=${token}`;
  }

  return headers;
}