import React from 'react';

function LoginPage() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div>
      <h1>Login with Google</h1>
      <button onClick={handleLogin}>Sign In with Google</button>
    </div>
  );
}

export default LoginPage;
