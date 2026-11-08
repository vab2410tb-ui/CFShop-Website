import { forwardRef } from "react";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ id, label, type = "text", ...props }, ref) => {
    return (
      <div className="relative">
        <div className=" bg-white border-1 rounded-md shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <input
            ref={ref}
            id={id}
            {...props}
            type={type}
            placeholder=" "
            className="
              peer w-full rounded-md border-0
              px-3 pt-6 pb-2
              outline-none
            "
          />
          
          <label
            htmlFor={id}
            className="
              pointer-events-none absolute left-3 top-4
              text-[#A7A7A7] transition-all duration-200

              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base

              peer-focus:top-2
              peer-focus:text-xs

              peer-not-placeholder-shown:top-2
              peer-not-placeholder-shown:text-xs
            "
          >
            {label}
          </label>
        </div>

      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;