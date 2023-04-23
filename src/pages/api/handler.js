import HttpError from "../httpError";

const APIUrl = "http://localhost:8080/"
export default async function handler(method, url, body = {}) {
  let request = {
    method: method,
  }

  if(method === "POST" || method === "PUT") {
    request.headers = { 'Content-Type': 'application/json' },
    request.body = JSON.stringify(body)
  }

  const response = await fetch(APIUrl+url, request);
  if (!response.ok) {
    const error = await response.json()
    throw  new HttpError(response.status, error.errorMessage);
  }
  return response.json();
}
