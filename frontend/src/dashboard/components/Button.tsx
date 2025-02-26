import { ReactNode } from "react";

interface ButtonComponentIF {
  size?: "xs" | "sm" | "md" | "lg";
  children: ReactNode;
  customClassName?: string;
}

export default function Button({
  children,
  customClassName,
}: ButtonComponentIF) {
  return (
    <div
      className={`bg-blue-18 px-[26px] py-[5px] xl:py-3.5 xl:px-10 rounded-md md:rounded-[9px] text-white text-xs font-medium ${customClassName}`}
    >
      {children}
    </div>
  );
}
