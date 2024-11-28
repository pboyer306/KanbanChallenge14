import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
      const token = this.getToken();
      return jwtDecode<JwtPayload>(token);
      }
    
  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token;
  }
  
  isTokenExpired() {
    // TODO: return a value that indicates if the token is expired
    try{
      const jwtToken = this.getProfile();
      const current = Date.now()
      return jwtToken.exp == undefined || current >= jwtToken.exp * 1000
    }
    catch (error) {
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    window.location.href = '/';
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.href = '/';
  }
}

export default new AuthService();
