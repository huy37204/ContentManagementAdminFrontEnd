import { useState } from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full font-bold">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`border rounded-xl p-2 outline-none transition-all duration-150
          ${
            error
              ? "border-red-500"
              : isFocused
              ? "border-yellow-500"
              : "border-[#E6D9C3]"
          }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputField;
