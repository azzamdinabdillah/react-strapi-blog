import { ReactNode } from "react";

interface ButtonComponentIF {
  size?: "xs" | "sm" | "md" | "lg";
  children: ReactNode;
  customClassName?: string;
  buttonType: "submit" | "reset" | "button" | undefined;
  onclick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Button({
  children,
  customClassName,
  buttonType,
  size = "md",
  onclick,
  disabled = false,
}: ButtonComponentIF) {
  const sizeClasses: Record<typeof size, string> = {
    xs: "px-[15px] py-[5px] md:py-1.5 xl:py-2 xl:px-5",
    md: "px-[26px] py-[5px] md:py-2 xl:py-3.5 xl:px-10",
  };
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={buttonType}
      className={`${sizeClasses[size]} ${
        disabled ? "bg-blue-18/30" : "bg-blue-18"
      } bg-blue-18 cursor-pointer rounded-md md:rounded-[9px] text-white text-xs font-medium ${customClassName}`}
    >
      {children}
    </button>
  );
}
