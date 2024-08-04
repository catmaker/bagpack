"use client";
import "./styles.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { use, useContext, useEffect, useState } from "react";
import Image from "next/image";
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
          <Image
            src={"/bagpackIcon/bold.svg"}
            width={10}
            height={10}
            alt="bold_icon"
          ></Image>
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
  내용을 입력해주세요.
`;
type EditorComponentProps = {
  contents?: string;
  title?: string;
  id?: string;
};
const EditorComponent = ({ contents, title, id }: EditorComponentProps) => {
  const user = useContext(UserContext);
  const [currentContent, setCurrentContent] = useState(contents); // 초기 상태를 `contents`로 설정
  const [currentTitle, setCurrentTitle] = useState(title); // title 상태 관리 추가
  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const selectedMood = useScheduleStore((state) => state.selectedMood);
  const startDate = useScheduleStore((state) => state.startDate);
  const setStartDate = useScheduleStore((state) => state.setStartDate);
  const endDate = useScheduleStore((state) => state.endDate);
  const setEndDate = useScheduleStore((state) => state.setEndDate);
  const setPostsUpdate = useScheduleStore((state) => state.setPostsUpdate);

  const userEmail = user?.email;
  console.log("userEmail" + userEmail);
  console.log("post" + currentContent);
  console.log("date" + selectedDate);
  console.log("mood" + selectedMood);
  console.log("title" + currentTitle);
  const handleEditorUpdate = ({ editor }: any) => {
    const updatedContent = editor.getHTML();
    setCurrentContent(updatedContent);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value); // 입력 필드의 값이 변경될 때마다 currentTitle 업데이트
  };

  const saveContent = async (e: any) => {
    e.preventDefault();

    // currentContent가 없다면 경고 메시지 표시 후 함수 종료
    if (!currentContent) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!currentTitle) {
      alert("제목을 입력해주세요.");
      return;
    }

    const payload = {
      email: userEmail ?? "error", // userEmail이 undefined이면 "error" 사용
      post: currentContent ?? "내용이 없습니다.", // currentContent가 undefined이면 "내용이 없습니다." 사용
      startDate: startDate ?? "error", // selectedDate가 undefined이면 "error" 사용
      endDate: endDate ?? startDate, // endDate가 undefined이면 startDate 사용
      title: currentTitle ?? "무제", // currentTitle이 undefined이면 "무제" 사용
      mood: selectedMood ?? "error", // selectedMood가 undefined이면 "error" 사용
    };
    console.log(payload);
    try {
      const response = await fetch("/api/user/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      setPostsUpdate(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateContent = async (e: any) => {
    e.preventDefault();
    console.log("Selected Date:", selectedDate);

    // 전송될 데이터 객체 생성
    const payload = {
      email: userEmail ?? "error", // userEmail이 undefined이면 "error" 사용
      post: currentContent ?? "내용이 없습니다.", // currentContent가 undefined이면 "내용이 없습니다." 사용
      startDate: startDate ?? "error", // selectedDate가 undefined이면 "error" 사용
      endDate: endDate ?? startDate, // endDate가 undefined이면 startDate 사용
      title: currentTitle ?? "무제", // currentTitle이 undefined이면 "무제" 사용
      mood: selectedMood ?? "error", // selectedMood가 undefined이면 "error" 사용
      id: id,
    };

    // 전송될 데이터 로그로 출력
    console.log("Sending payload:", payload);

    try {
      const response = await fetch("/api/user/updatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // payload 변수 사용
      });
      const data = await response.json();
      console.log(data);
      setPostsUpdate(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <EditorProvider
        slotBefore={
          <>
            <h1 className="title_h1">글 작성하기</h1>
            <p className="title_label">제목을 입력해주세요.</p>
            <input
              className="title_input"
              type="text"
              value={currentTitle ? currentTitle : ""}
              onChange={handleTitleChange}
              placeholder={currentTitle ? currentTitle : "제목을 입력하세요"}
            ></input>
            <MenuBar />
          </>
        }
        extensions={extensions}
        content={currentContent ? currentContent : content}
        onUpdate={handleEditorUpdate}
      />
      {contents ? (
        <button onClick={updateContent}>수정</button>
      ) : (
        <button onClick={saveContent}>저장</button>
      )}
    </>
  );
};

export default EditorComponent;
