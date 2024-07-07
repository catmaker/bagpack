"use client";
import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { set } from "date-fns";
import React, { use, useContext, useEffect, useState } from "react";
// provider
import { UserContext } from "@/app/provider/UserProvider";
// zustand
import useScheduleStore from "@/store/schedule";

const MenuBar = () => {
  const [color, setColor] = useState("#958DF1");
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          Code
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().unsetAllMarks().run();
          }}
        >
          Clear marks
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().clearNodes().run();
          }}
        >
          Clear nodes
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setParagraph().run();
          }}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }}
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHorizontalRule().run();
          }}
        >
          Horizontal rule
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHardBreak().run();
          }}
        >
          Hard break
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setColor("#958DF1").run();
          }}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          Purple
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)} // 컬러 선택 시 상태 업데이트
          style={{ marginLeft: "10px" }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setColor(color).run();
          }}
          className={
            editor.isActive("textStyle", { color: color }) ? "is-active" : ""
          }
        >
          Apply Color
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const EditorComponent = () => {
  const [currentContent, setCurrentContent] = useState(content);
  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const selectedMood = useScheduleStore((state) => state.selectedMood);
  console.log("Selected Mood:", selectedMood);
  console.log(selectedDate);
  const user = useContext(UserContext);
  const userEmail = user?.email;
  const handleEditorUpdate = ({ editor }: any) => {
    const updatedContent = editor.getHTML();
    setCurrentContent(updatedContent);
    console.log(updatedContent);
  };
  const saveContent = (e: any) => {
    e.preventDefault();
    console.log("Selected Date:", selectedDate);
    fetch("/api/user/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        post: currentContent,
        date: selectedDate,
        mood: selectedMood,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={handleEditorUpdate}
      />
      <button onClick={saveContent}>저장</button>
    </>
  );
};

export default EditorComponent;
