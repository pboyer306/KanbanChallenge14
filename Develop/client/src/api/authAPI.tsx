import { UserLogin } from "../interfaces/UserLogin";
import AuthService from '../../src/utils/auth';
console.log(AuthService.isTokenExpired());


const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  const response = await fetch("auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  });

  return await response.json();
};

const fetchTickets = async () => {
  const token = localStorage.getItem('token');

  if (!token || AuthService.isTokenExpired()) {
    throw new Error("Token is invalid or expired. Please log in again.");
  }

  const response = await fetch("api/tickets", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return await response.json();
};

export { login, fetchTickets };