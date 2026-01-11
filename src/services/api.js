const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiRequest = async (url, method, body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};
