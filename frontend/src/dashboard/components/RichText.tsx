import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

export function RichText() {
  const [html, setHtml] = useState('my <b>HTML</b>');
  
  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <Editor value={html} onChange={onChange} />
  );
}