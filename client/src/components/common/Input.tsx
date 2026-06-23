interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  step?: string;
  error?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function Input({
  label,
  placeholder,
  type = "text",
  step,
  error,
  icon,
  value,
  onChange,
  className = "",
}: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-all duration-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
            icon ? "pl-10" : ""
          } ${
            error
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-zinc-300"
          } ${className}`}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
