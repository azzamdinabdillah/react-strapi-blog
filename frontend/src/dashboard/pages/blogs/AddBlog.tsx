import { InputTextAreaGroup, InputTextGroup } from "../../components/Inputs";
import BaseSidebarHeader from "../../layouts/BaseSidebarHeader";

export default function AddBlog() {
  return (
    <BaseSidebarHeader title="Blogs / Add Blog">
      <div className="py-5.5 px-5 bg-white rounded-2xl">
        <div className="gap-4 flex flex-col">
          <InputTextGroup placeholder="Charlene Reed" label="Title" />
          <InputTextGroup placeholder="Azam Din Abdillah" label="Author" />
          <InputTextAreaGroup placeholder="Write your description here...." label="Description" />
        </div>
      </div>
    </BaseSidebarHeader>
  );
}
