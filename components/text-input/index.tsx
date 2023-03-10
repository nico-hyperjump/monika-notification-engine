import { InputHTMLAttributes } from 'react';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function TextInput({
  label,
  errorMessage,
  ...inputProps
}: TextInputProps): JSX.Element {
  return (
    <div className={`space-y-3 ${inputProps?.className}`}>
      {label && (
        <label htmlFor={inputProps.id} className="text-sm sm:text-lg">
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className="w-full bg-monika-gray bg-opacity-10 rounded-md shadow-md py-3 px-5 text-sm sm:text-lg placeholder-gray-400"
      />
      {!!errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
