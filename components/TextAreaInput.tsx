// import React, { InputHTMLAttributes, useRef, useState } from "react";

// interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
//   orientation: string;
//   type: string;
//   label: string;
//   value: string | number;
//   placeholder: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }
// const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
// const TextInput: React.FC<CustomInputProps> = ({
//   orientation,
//   label,
//   placeholder,
//   value,
//   onChange,
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   return (
//     <div
//       className={`${
//         orientation === "vertical"
//           ? "flex flex-col pb-2 gap-0 "
//           : "mb-5 items-center flex gap-5"
//       }`}
//     >
//       <div className="w-full md:w-[30%] text-slate-700 text-base lg:text-lg">
//         {label}
//       </div>
//       <div className=" md:flex items-center gap-5">
//         <div className="w-full text-slate-800 text-base lg:text-lg">
//         <textarea
//               className="w-full h-[100px] text-sm border bg-[#f0f4f8] border-[#010e3b] rounded-lg p-2"
//               value={value}
//               onChange={onChange}
//               placeholder={placeholder}
//               ref={inputRef as React.RefObject<HTMLTextAreaElement>}
//             />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextInput;
