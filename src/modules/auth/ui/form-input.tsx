"use client";

import { forwardRef, ReactNode } from "react";

interface FormInputProps {
  type: string;
  placeholder?: string;
  label?: string;
  error?: string;
  icon?: ReactNode;
  required?: boolean;
  minLength?: number;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ type, placeholder, label, error, icon, required = false, minLength, ...props }, ref) => {
    return (
      <div className="form-control">
        {label && (
          <label className="label">
            <span className="label-text text-gray-700 font-medium">{label}</span>
          </label>
        )}
        <div className={`input w-full input-bordered flex items-center gap-3 px-4 py-3 h-12 bg-white border-gray-300 rounded-lg ${error ? 'border-red-500' : 'focus-within:border-blue-500'}`}>
          {icon && (
            <div className="h-5 w-5 opacity-50 flex-shrink-0">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className="grow bg-transparent placeholder:text-gray-400 focus:outline-none text-gray-900"
            placeholder={placeholder}
            required={required}
            minLength={minLength}
            {...props}
          />
        </div>
        {error && (
          <div className="label">
            <span className="label-text-alt text-red-500">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
