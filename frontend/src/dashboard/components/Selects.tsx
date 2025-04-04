import { Fragment } from "react/jsx-runtime";
import { ChangeEventHandler, ReactNode } from "react";
import SelectIcon from '/dashboard/icons/select-icon.svg';

export interface SelectIF {
  value: string;
  text: string;
  label: string | ReactNode;
}

export function Select({
  option,
  selected,
  onChange,
  placeholder
}: {
  option: SelectIF[];
  selected?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>
  placeholder?: string
}) {
  return (
    <div className="relative w-full rounded-[10px] text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography">
      <select value={selected || ""} className="focus-input border rounded-[10px] border-gray-df overflow-hidden appearance-none w-full h-full py-3 px-4" name="" id="" onChange={onChange}>
        <option value="">{placeholder}</option>
        {option.map((opt, index) => (
          <Fragment key={index}>
            <option
              value={opt.value}
            >
              {opt.text}
            </option>
          </Fragment>
        ))}
      </select>
      <img
        src={SelectIcon}
        alt=""
        className="absolute top-1/2 -translate-y-1/2 right-4"
      />
    </div>
  );
}
