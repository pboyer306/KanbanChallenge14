import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  // State to handle error message
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any previous errors before attempting login

    try {
      const data = await login(loginData); // Assuming `login` sends login data to the server
      Auth.login(data.token); // Store token and redirect
    } catch (err) {
      // If login fails, set error message
      console.error('Failed to login', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        {error && <div className="error-message">{error}</div>} {/* Display error message if any */}

        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />

        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />

        <div></div>
        <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
};

export default Login;
