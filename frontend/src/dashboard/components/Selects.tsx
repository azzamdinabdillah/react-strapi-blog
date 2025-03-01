import { InputIF } from "./Inputs"
import { Label } from "./Label"

export function Select(){
    return (
        <div className="relative w-full rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography">
            <select className="appearance-none w-full h-full py-3 px-4" name="" id="">
        <option value="">adada</option>
        <option value="">adada asadadqee</option>
    </select>
    <img src="/dashboard/icons/select-icon.svg" alt="" className="absolute top-1/2 -translate-y-1/2 right-4" />
        </div>
    )
}

export function SelectGroup({label}: InputIF){
    return (
        <div className="flex flex-col gap-[9px]">
            <Label label={label}/>
            <Select/>
        </div>
    )
}