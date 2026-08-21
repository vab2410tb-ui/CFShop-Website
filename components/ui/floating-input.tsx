interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
}

export const FloatingInput = ({
  id,
  label,
  type = "text",
}: FloatingInputProps) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        className="
          peer w-full rounded-md border border-gray-300
          px-3 pt-6 pb-2
        "
      />

      <label
        htmlFor={id}
        className="
          pointer-events-none absolute left-3 top-4
          text-gray-500 transition-all duration-200

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