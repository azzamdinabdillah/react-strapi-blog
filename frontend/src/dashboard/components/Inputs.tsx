interface InputIF {
  placeholder: string;
  value?: string;
  label?: string;
}

export function InputText({ placeholder }: InputIF) {
  return (
    <input placeholder={placeholder} type="text" className="w-full py-3 px-4 rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography" />
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
      <label htmlFor="" className="text-[13px] text-black-23">
        {label}
      </label>
      <InputText placeholder={placeholder} />
    </div>
  );
}

export function InputTextAreaGroup({ placeholder, label }: InputIF) {
  return (
    <div className="flex flex-col gap-[9px]">
      <label htmlFor="" className="text-[13px] text-black-23">
        {label}
      </label>
      <InputTextArea placeholder={placeholder} />
    </div>
  );
}
