interface FloatingTextareaProps {
  id: string;
  label: string;
  rows?: number;
}

export function FloatingTextarea({
  id,
  label,
  rows = 4,
}: FloatingTextareaProps) {
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        placeholder=" "
        className="
          peer w-full resize-none rounded-md
          border border-gray-300
          px-3 pt-6 pb-2
          outline-none
          focus:border-gray-500
        "
      />

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
    </div>
  );
}