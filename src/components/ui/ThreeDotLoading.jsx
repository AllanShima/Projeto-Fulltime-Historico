import React, { useState, useEffect } from 'react';

// You can define some simple CSS for styling the loading text
// For simplicity, I'm just using inline styles here, but you'd
// normally use a separate CSS file or a styled-components library.
const loadingStyles = {
  fontSize: '2em', // Make it visible
  fontWeight: 'bold',
  color: '#333',
  fontFamily: 'monospace',
};

const ThreeDotLoading = () => {
  // 1. State to keep track of the number of dots (0, 1, 2, or 3)
  const [dots, setDots] = useState(0);

  // 2. useEffect to manage the animation loop
  useEffect(() => {
    // Set an interval that runs every 300 milliseconds
    const intervalId = setInterval(() => {
      // The current value of 'dots' is used to calculate the next state.
      // We cycle from 0 -> 1 -> 2 -> 3 and then back to 0.
      setDots(prevDots => (prevDots + 1) % 4);
    }, 300); // Adjust this time (in milliseconds) to change the speed

    // 3. Cleanup function: This is crucial to stop the interval
    // when the component unmounts (e.g., when the data loads).
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // 4. Determine the number of dots to display
  const dotString = '.'.repeat(dots);

  // 5. Render the loading message and the dynamic dots
  return (
    <div>
      <span aria-live="polite" aria-label={`Loading ${dots} dots`}>{dotString}</span>
    </div>
  );
};

export default ThreeDotLoading;