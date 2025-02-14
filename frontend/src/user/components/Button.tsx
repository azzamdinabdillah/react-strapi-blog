import { ReactNode } from "react";

interface ButtonComponentIF {
  children: ReactNode;
  classNameCustom?: string;
  variants: "white-100" | "blue-100";
}

const variantClasses = {
  "white-100": "bg-white/10 text-white font-normal",
  "blue-100": "bg-blue-100 text-blue font-medium",
};

export function Button({
  children,
  classNameCustom,
  variants,
}: ButtonComponentIF) {
  return (
    <button
      className={`${classNameCustom} ${variantClasses[variants]} py-2.5 px-5 rounded-lg text-sm flex justify-center items-center text-center`}
    >
      {children}
    </button>
  );
}
