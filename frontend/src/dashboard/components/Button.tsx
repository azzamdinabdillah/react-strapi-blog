import { ReactNode } from "react";

interface ButtonComponentIF {
  size?: "xs" | "sm" | "md" | "lg";
  children: ReactNode;
  customClassName?: string;
  buttonType: "submit" | "reset" | "button" | undefined;
  onclick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  children,
  customClassName,
  buttonType,
  size = 'md',
  onclick
}: ButtonComponentIF) {
  const sizeClasses: Record<typeof size, string> = {
    xs: "px-[15px] py-[5px] xl:py-2 xl:px-5",
    md: "px-[26px] py-[5px] xl:py-3.5 xl:px-10"
  }
  return (
    <button
      onClick={onclick}
      type={buttonType}
      className={`${sizeClasses[size]} bg-blue-18 cursor-pointer rounded-md md:rounded-[9px] text-white text-xs font-medium ${customClassName}`}
    >
      {children}
    </button>
  );
}
