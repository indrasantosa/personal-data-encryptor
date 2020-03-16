import React, { ReactChildren } from 'react';

interface Button {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Button> = ({ className, onClick, children }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
