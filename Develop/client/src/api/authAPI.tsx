import { UserLogin } from "../interfaces/UserLogin";

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
  
  if (!token) {
    throw new Error("No token found, please login");
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