import { ReactNode } from "react";

export function Label({
  label,
  note,
}: {
  label: string | ReactNode;
  note?: string | ReactNode;
}) {
  return (
    <label
      htmlFor=""
      className="text-[13px] text-black-23 flex gap-2 items-center"
    >
      {label}
      <span className="text-black-23/50">{note}</span>
    </label>
  );
}
