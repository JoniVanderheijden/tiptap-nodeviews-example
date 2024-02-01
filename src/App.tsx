import {
  useEditor,
  EditorContent,
  ReactNodeViewRenderer,
  NodeViewWrapper,
} from "@tiptap/react";
import { Node } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import "./App.css";

function Component() {
  return <NodeViewWrapper as="span">LoL</NodeViewWrapper>;
}

const CustomComponent = Node.create({
  name: "reactComponent",

  group: "inline",
  atom: true,
  inline: true,

  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-component", HTMLAttributes];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

const extensions = [Document, Paragraph, Text, CustomComponent];

const content = `<p>
  ${"<react-component></react-component>".repeat(100)}
</p>`;

function App() {
  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <div className="editor">
      <EditorContent editor={editor} />
    </div>
  );
}

export default App;
