import React from 'react';

// Can be used to display current color
export const ColorDot = (props: { color: string }) => {
  return (
    <div
      style={{
        height: '15px',
        width: '15px',
        backgroundColor: props.color,
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: '10px',
      }}
    ></div>
  );
};
