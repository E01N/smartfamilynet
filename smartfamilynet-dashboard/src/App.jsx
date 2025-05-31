import React, { useState } from 'react';
import Login from './components/Login';
import ParentDashboard from './components/ParentDashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ParentDashboard token={token} />
      )}
    </div>
  );
}

export default App;
