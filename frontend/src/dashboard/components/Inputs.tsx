import React from "react";
import { Label } from "./Label";

export interface InputIF {
  placeholder?: string;
  value?: string;
  label?: string;
  onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeTextarea?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export function InputText({ placeholder, onChangeInput, value }: InputIF) {
  return (
    <input
      placeholder={placeholder}
      type="text"
      value={value || ""}
      onChange={onChangeInput}
      className="focus-input w-full py-3 px-4 rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography"
    />
  );
}

export function InputImage({ placeholder, onChangeInput }: InputIF) {
  return (
    <input
      onChange={onChangeInput}
      accept="image/*"
      placeholder={placeholder}
      type="file"
      className="focus-input w-full py-3 px-4 rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography"
    />
  );
}

export function InputTextArea({
  placeholder,
  onChangeTextarea,
  value,
}: InputIF) {
  return (
    <textarea
      onChange={onChangeTextarea}
      value={value || ""}
      placeholder={placeholder}
      className="focus-input w-full py-3 px-4 rounded-[10px] border border-gray-df text-blue-71 input-dashboard-typography placeholder:input-dashboard-typography"
      rows={5}
    ></textarea>
  );
}

export function InputTextGroup({
  placeholder,
  label,
  onChangeInput,
  value,
}: InputIF) {
  return (
    <div className="flex flex-col gap-[9px]">
      <Label label={label} />
      <InputText
        placeholder={placeholder}
        onChangeInput={onChangeInput}
        value={value || ""}
      />
    </div>
  );
}

export function InputTextAreaGroup({
  placeholder,
  label,
  onChangeTextarea,
  value,
}: InputIF) {
  return (
    <div className="flex flex-col gap-[9px]">
      <Label label={label} />
      <InputTextArea
        placeholder={placeholder}
        onChangeTextarea={onChangeTextarea}
        value={value || ""}
      />
    </div>
  );
}
