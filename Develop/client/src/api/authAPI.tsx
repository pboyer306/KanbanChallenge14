import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  const response = await fetch("auth/login", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(userInfo),});
  return await response.json();
}

export { login };
