import React from 'react';

const RecordingIndicator = () => {
  return (
    <span className="h-3 w-3 motion-preset-blink motion-duration-2000">
        {/* The solid core dot */}
        <span className="inline-flex rounded-full h-2.5 w-2.5 bg-red-500 motion-preset-blink motion-duration-2000"></span>
    </span>
  );
};

export default RecordingIndicator;