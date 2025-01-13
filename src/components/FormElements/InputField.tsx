import React from 'react';

interface InputProps {
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
}

const FullWidthInput: React.FC<InputProps> = ({ label, placeholder, type = 'text', value, name, onChange, disabled, error }) => {
    return (
        <div className="mb-4">
            <label htmlFor={label} className="mb-1 block text-black dark:text-white">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                disabled={disabled}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${error ? 'border-red-500' : ''}`}
                id={label}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

const HalfWidthInput: React.FC<InputProps> = ({ label, placeholder, type = 'text', value, name, onChange, disabled, error }) => {
    return (
        <div className="w-1/2 mb-4">
            <label htmlFor={label} className="mb-1 block text-black dark:text-white">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                disabled={disabled}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${error ? 'border-red-500' : ''}`}
                id={label}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export { HalfWidthInput, FullWidthInput };