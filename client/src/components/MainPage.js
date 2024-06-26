import React from 'react';

const MainPage = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <div>
        <button onClick={() => console.log('Start Matching')}>Start Matching</button>
        <button onClick={() => console.log('Conversations')}>Conversations</button>
        <button onClick={() => console.log('Location')}>Location</button>
        <button onClick={() => console.log('Profile')}>Profile</button>
      </div>
    </div>
  );
};

export default MainPage;
