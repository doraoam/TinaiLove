import React from 'react';
import CurrentPath from './CurrentPath'; 

function HomePage() {
  return (
    <div>
      <CurrentPath /> 
      <h1>Welcome Home!</h1>
      <a href="/login">Login</a>
    </div>
  );
}

export default HomePage;
