import { InputHTMLAttributes } from 'react';
import PhoneInput from 'react-phone-input-2';
import startsWith from 'lodash.startswith';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  errorMessage?: string;
  handleNotValid?: () => void;
  handleChangeValue: (val: string) => void;
}

export default function CountryPhoneInput({
  label,
  value,
  handleNotValid,
  handleChangeValue,
  errorMessage,
  ...inputProps
}: PhoneInputProps): JSX.Element {
  return (
    <div className={`space-y-3 ${inputProps?.className}`}>
      {label && (
        <label htmlFor={inputProps.id} className="text-sm sm:text-lg">
          {label}
        </label>
      )}
      <PhoneInput
        data-testid="phone-input"
        country={'id'}
        value={value}
        containerClass="bg-monika-gray bg-opacity-10 rounded-md shadow-md px-5 py-2 text-sm sm:text-lg placeholder-gray-400"
        dropdownClass="bg-monika-black border border-monika-gray border-opacity-10 rounded-md shadow-md text-sm sm:text-lg placeholder-gray-400 font-sans transition-all duration-500"
        inputClass="bg-transparent text-white text-sm sm:text-lg border-0 font-sans w-full"
        buttonClass="bg-transparent border-0"
        onChange={(value: string) => handleChangeValue(value)}
        isValid={(inputNumber, _country, countries) => {
          const isValid = countries.some((country: any) => {
            return (
              startsWith(inputNumber, country.dialCode) ||
              startsWith(country.dialCode, inputNumber)
            );
          });
          if (!isValid) {
            handleNotValid();
          }
          return isValid;
        }}
      />
      {!!errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
