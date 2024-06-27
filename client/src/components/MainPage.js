import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [menCount, setMenCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [nopeCount, setNopeCount] = useState(0);

  const navigate = useNavigate();

  // Example functions to increment counters
  const handleLike = () => {
    setLikeCount(likeCount + 1);
    // simulate swiping right
  };

  const handleNope = () => {
    setNopeCount(nopeCount + 1);
    // simulate swiping left
  };

  const handleMenCount = () => {
    setMenCount(menCount + 1);
    // simulate viewing a new profile
  };

  return (
    <div>
      <h1>TinaiLove</h1>
      <h2>This session statistic</h2>
      <div>
        Men: {menCount} | Like: {likeCount} | Nope: {nopeCount}
      </div>
      <div>
        <button onClick={handleLike}>Like</button>
        <button onClick={handleNope}>Nope</button>
        <button onClick={handleMenCount}>Next Man</button>
      </div>
      <iframe src="https://tinder.com" style={{ width: '100%', height: '80vh' }} title="Tinder"></iframe>
    </div>
  );
};

export default MainPage;