import { Fragment } from "react/jsx-runtime";
import { Label } from "./Label";
import { ReactNode } from "react";

export interface SelectIF {
  value: string;
  text: string;
  label: string | ReactNode;
}

export function Select({
  option,
  selected,
}: {
  option: SelectIF[];
  selected?: string;
}) {
  return (
    <div className="relative w-full rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography">
      <select className="appearance-none w-full h-full py-3 px-4" name="" id="">
        {option.map((opt, index) => (
          <Fragment key={index}>
            <option
              selected={opt.value === selected ? true : false}
              value={opt.value}
            >
              {opt.text}
            </option>
          </Fragment>
        ))}
      </select>
      <img
        src="/dashboard/icons/select-icon.svg"
        alt=""
        className="absolute top-1/2 -translate-y-1/2 right-4"
      />
    </div>
  );
}

export function SelectGroup({
  label,
  option,
  selected,
}: {
  label: string;
  option: SelectIF[];
  selected: string;
}) {
  return (
    <div className="flex flex-col gap-[9px]">
      <Label label={label} />
      <Select option={option} selected={selected} />
    </div>
  );
}
