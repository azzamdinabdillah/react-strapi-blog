import { ReactNode } from "react";

export function Label({label}: {label: string | ReactNode}){
    return (
        <label htmlFor="" className="text-[13px] text-black-23">
        {label}
      </label>
    )
}