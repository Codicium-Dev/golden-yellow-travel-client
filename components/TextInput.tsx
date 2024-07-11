import React, { InputHTMLAttributes, useRef, useState } from "react";

interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  orientation: string;
  alignment: string;
  type: string;
  label: string;
  value: string | number;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const TextInput: React.FC<CustomInputProps> = ({
  orientation,
  alignment,
  type,
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  return (
    <div
      className={`${
        orientation
          ? "flex flex-col mb-0"
          : "flex flex-col md:flex-row md:gap-5 mb-5"
      } pb-2 items-center gap:0`}
    >
      <div className="w-full md:w-[30%] text-slate-700 text-sm md:text-base lg:text-lg">
        {label}
      </div>
      <div className="md:flex items-center gap-5 w-full ">
        <div className="w-full text-slate-800 text-base lg:text-lg ">
          {type === "textarea" ? (
            <textarea
              className={`${
                alignment ? alignment : ""
              } w-full h-[5.5rem] text-sm bg-white shadow-sm border-none rounded-lg p-2 mt-1 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500`}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            />
          ) : (
            <input
              min={2}
              type={type}
              className={`${
                alignment ? alignment : ""
              } w-full md:w-[70%] lg:w-[50%] h-[34px] text-sm bg-white shadow-sm border-none rounded-lg p-2 mt-1 md:mt-0 focus:outline-none focus:ring-1 focus:ring-gray-500`}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              ref={inputRef as React.RefObject<HTMLInputElement>}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
