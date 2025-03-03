import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

export function RichText({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: ContentEditableEvent) => void;
}) {
  return <Editor value={value} onChange={onChange} />;
}
