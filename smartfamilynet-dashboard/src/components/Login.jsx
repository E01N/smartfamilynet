import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('parent@example.com');
  const [password, setPassword] = useState('SecurePass123');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await axios .post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      email,
      password,
    })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token); // ← THIS MUST BE HERE
      window.location.href = '/dashboard';
    })

      const { token } = res.data;

      if (rememberMe) {
        localStorage.setItem('token', token);
      }

      onLogin(token);
    } catch (err) {
      console.error(err);
      setError('Login failed. Check your credentials.');
    }
  };

  return (
  <div className="login-wrapper">
    <div className="login-container">
      <h1 className="brand-title">SmartFamilyNet</h1>

      <div className="login-box">
        <h2 className="login-title">Parent Login</h2>

        {error && <p className="login-error">{error}</p>}

        <label className="login-label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <label className="login-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>

        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  </div>
);


};

export default Login;
