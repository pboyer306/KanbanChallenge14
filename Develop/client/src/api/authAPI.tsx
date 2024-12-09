import { UserLogin } from "../interfaces/UserLogin";
import AuthService from '../../src/utils/auth';
console.log(AuthService.isTokenExpired());


const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userInfo), });
    let data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data
  }


  catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject(err);
  }
}



export { login };