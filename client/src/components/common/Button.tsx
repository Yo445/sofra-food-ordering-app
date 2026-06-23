import { Loader } from "./Loader";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary: "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 shadow-sm",
    secondary: "bg-green-700 text-white hover:bg-green-800 focus:ring-green-600 shadow-sm",
    outline: "border-2 border-amber-600 text-amber-700 hover:bg-amber-50 focus:ring-amber-500",
    ghost: "text-amber-700 hover:bg-amber-100 focus:ring-amber-500",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? <Loader size="sm" /> : children}
    </button>
  );
}
