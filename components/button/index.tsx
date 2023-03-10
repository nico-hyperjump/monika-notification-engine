import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'text';
  rounded?: boolean;
  text?: boolean;
}

export default function Button({ variant, rounded, ...props }: ButtonProps) {
  switch (variant) {
    case 'outline':
      return <ButtonOutlined {...props} />;
    case 'text':
      return <TextButton {...props} />;
    default:
      return (
        <button
          {...props}
          className={`px-6 py-2 bg-gradient-to-r from-monika-purple to-monika-aqua font-sans text-white ${
            props.className ? props.className : ''
          } ${rounded !== false ? 'rounded-full' : 'rounded-md'}`}>
          {props.children}
        </button>
      );
  }
}

function ButtonOutlined({ rounded, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 border-2 border-monika-purple text-monika-purple font-sans hover:bg-monika-purple hover:text-white transition-all duration-500 ${
        props.className ? props.className : ''
      } ${rounded !== false ? 'rounded-full' : 'rounded-md'}`}>
      {props.children}
    </button>
  );
}

function TextButton({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex justify-center py-2 font-bold rounded-md underline transition focus:outline-none hover:text-gray-800 ${
        props.className ? props.className : ''
      }`}>
      {props.children}
    </button>
  );
}
