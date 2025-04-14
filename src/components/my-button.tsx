import React from 'react';

export interface MyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'blue' | 'green' | 'red';
}

function MyButton({ text, variant, ...props }: MyButtonProps) {
  const blueColor = 'bg-cyan-700 hover:bg-cyan-800';
  const greenColor = 'bg-emerald-700 hover:bg-emerald-800';
  const redColor = 'bg-red-700 hover:bg-red-800';

  const colorClass = () => {
    switch (variant) {
      case 'blue':
        return blueColor;
      case 'green':
        return greenColor;
      case 'red':
        return redColor;
      default:
        return blueColor;
    }
  };

  return (
    <button
      className={`w-full  text-white rounded p-2  cursor-pointer transition-all duration-150 ${colorClass()}`}
      {...props}
    >
      {text}
    </button>
  );
}

export default MyButton;
