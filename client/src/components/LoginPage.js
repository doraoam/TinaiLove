import React, { useEffect } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import CurrentPath from './CurrentPath';  // Make sure the path is correct based on your project structure

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();  // This will cause a rerender on URL change

  // Function to handle login
  const handleLogin = () => {
    // This is a simplified version. You'll need to handle the API response accordingly.
    const loginUrl = 'http://localhost:3001/auth/google';
    
    window.location.href = loginUrl;
  };

  console.log("Done Login");

  // Check for authentication status
  useEffect(() => {
    console.log("Current URL search:", location.search);
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    console.log("Token from URL:", token);
    if (token) {
      localStorage.setItem('authToken', token);
      console.log("Token stored in local storage");	
      navigate('/main');
    }
  }, [navigate, location.search]);  // Add location.search to dependency array


  return (
    <div>
      <CurrentPath /> {/* This will display the current path or log it to the console */}
      <h1>Login with Google</h1>
      <button onClick={handleLogin}>Sign In with Google</button>
    </div>
  );
}

export default LoginPage;
