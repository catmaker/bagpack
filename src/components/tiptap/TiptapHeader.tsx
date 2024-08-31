import React, { useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strike,
  Code,
  Paragraph,
  H1,
  H2,
  H3,
  BulletList,
  OrderedList,
  Blockquote,
  Undo,
  Redo,
} from "../../../public/svg";

const MenuBar = () => {
  const [color, setColor] = useState("#958DF1");
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="tiptap-button-group">
        <div className="button-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <Bold width={20} height={20} alt="bold_icon" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <Italic width={20} height={20} alt="italic_icon" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleStrike().run();
            }}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <Strike width={20} height={20} alt="strike_icon" />
          </button>
        </div>
        <div className="button-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleCode().run();
            }}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            <Code width={20} height={20} alt="code_icon" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setParagraph().run();
            }}
            className={editor.isActive("paragraph") ? "is-active" : ""}
          >
            <Paragraph width={20} height={20} alt="paragraph_icon" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            <H1 width={20} height={20} alt="h1" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            <H2 width={20} height={20} alt="h2" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            <H3 width={20} height={20} alt="h3" />
          </button>
        </div>
        <div className="button-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <BulletList width={32} height={24} alt="bulletList_icon" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <OrderedList width={32} height={24} alt="orderedList_icon" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBlockquote().run();
            }}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            <Blockquote width={32} height={24} alt="blockquote_icon" />
          </button>
        </div>
        <div className="button-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().undo().run();
            }}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo width={20} height={20} fill="none" alt="undo_icon" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().redo().run();
            }}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo width={20} height={20} fill="none" alt="redo_icon" />
          </button>
        </div>
        <input
          type="color"
          value={color}
          className="tiptap-color"
          onChange={(e) => {
            setColor(e.target.value);
            editor.chain().focus().setColor(e.target.value).run();
          }}
          style={{ marginLeft: "10px" }}
        />
      </div>
    </div>
  );
};
export default MenuBar;
