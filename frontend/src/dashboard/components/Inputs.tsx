import { Label } from "./Label";

export interface InputIF {
  placeholder?: string;
  value?: string;
  label?: string;
}

export function InputText({ placeholder }: InputIF) {
  return (
    <input placeholder={placeholder} type="text" className="w-full py-3 px-4 rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography" />
  );
}

export function InputImage({ placeholder }: InputIF) {
  return (
    <input accept="image/*" placeholder={placeholder} type="file" className="w-full py-3 px-4 rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography" />
  );
}

export function InputTextArea({ placeholder }: InputIF) {
  return (
    <textarea
      placeholder={placeholder}
      className="w-full py-3 px-4 rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography"
      rows={5}
    ></textarea>
  );
}

export function InputTextGroup({ placeholder, label }: InputIF) {
  return (
    <div className="flex flex-col gap-[9px]">
      <Label label={label}/>
      <InputText placeholder={placeholder} />
    </div>
  );
}

export function InputTextAreaGroup({ placeholder, label }: InputIF) {
  return (
    <div className="flex flex-col gap-[9px]">
      <Label label={label}/>
      <InputTextArea placeholder={placeholder} />
    </div>
  );
}
