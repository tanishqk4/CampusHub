import { announcements, departments, events, lostFoundItems, resources, tags } from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const AUTH_BASE_URL = "http://127.0.0.1:8000/api/auth";

function getToken() {
  return localStorage.getItem("campushub_access");
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(path, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function login(credentials) {
  const data = await request(`${AUTH_BASE_URL}/login/`, {
    method: "POST",
    body: JSON.stringify(credentials)
  });

  localStorage.setItem("campushub_access", data.access);
  localStorage.setItem("campushub_refresh", data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem("campushub_access");
  localStorage.removeItem("campushub_refresh");
}

export async function register(payload) {
  return request(`${AUTH_BASE_URL}/register/`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function fetchProfile() {
  return request(`${AUTH_BASE_URL}/me/`);
}

export async function fetchDashboardData() {
  try {
    const [announcementsData, eventsData, resourcesData, lostFoundData, departmentsData, tagsData] = await Promise.all([
      request(`${API_BASE_URL}/announcements/`),
      request(`${API_BASE_URL}/events/`),
      request(`${API_BASE_URL}/resources/`),
      request(`${API_BASE_URL}/lost-found/`),
      request(`${API_BASE_URL}/departments/`),
      request(`${API_BASE_URL}/tags/`)
    ]);

    return {
      announcements: announcementsData,
      events: eventsData,
      resources: resourcesData,
      lostFoundItems: lostFoundData,
      departments: departmentsData,
      tags: tagsData,
      offline: false
    };
  } catch (error) {
    return {
      announcements,
      events,
      resources,
      lostFoundItems,
      departments,
      tags,
      offline: true
    };
  }
}

export async function markInterested(eventId) {
  return request(`${API_BASE_URL}/events/${eventId}/interested/`, {
    method: "POST"
  });
}

export async function createReminder(payload) {
  return request(`${API_BASE_URL}/reminders/`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
