import * as React from "react";
export interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
}

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ id, label, rows = 4, className, placeholder, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          id={id}
          rows={rows}
          ref={ref} 
          placeholder={placeholder || " "} 
          {...props} 
          className={`
            peer w-full resize-none rounded-md
            px-3 pt-4 pb-2 border-0
            outline-none
            ${className || ""}
          `}
        />

        {label && (
          <label
            htmlFor={id}
            className="
              pointer-events-none absolute left-3 top-4
              text-gray-500
              transition-all duration-200

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
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

export default FloatingTextarea;