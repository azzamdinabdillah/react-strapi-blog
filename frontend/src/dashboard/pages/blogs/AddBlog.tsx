import { InputImage, InputTextAreaGroup, InputTextGroup } from "../../components/Inputs";
import { Label } from "../../components/Label";
import { SelectGroup } from "../../components/Selects";
import BaseSidebarHeader from "../../layouts/BaseSidebarHeader";
import RichTextExample from "../../components/RichTextEditor";

export default function AddBlog() {
  return (
    <BaseSidebarHeader title="Blogs / Add Blog">
      <div className="py-5.5 px-5 bg-white rounded-2xl">
        <div className="gap-4 flex flex-col">
          <InputTextGroup placeholder="Charlene Reed" label="Title" />
          <InputTextGroup placeholder="Azam Din Abdillah" label="Author" />
          <InputTextAreaGroup placeholder="Write your description here...." label="Description" />
          <SelectGroup label="Category" />
          <div className="flex flex-col gap-[9px]">
            <Label label="Image"/>
            <InputImage placeholder="Put your image here"/>
          </div>
          <div className="flex flex-col gap-[9px]">
            <Label label="Image"/>
            <RichTextExample/>
          </div>
        </div>
      </div>
    </BaseSidebarHeader>
  );
}
