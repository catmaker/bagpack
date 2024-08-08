"use client";
import "./styles.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { use, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Tiptap.module.scss";
import Modal from "../ui/modal/Modal";
import MenuBar from "./TiptapHeader";
// provider
import { UserContext } from "@/app/provider/UserProvider";
// zustand
import useScheduleStore from "@/store/schedule";
import DatePicker from "react-datepicker";

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
  onClose?: () => void;
};
const EditorComponent = ({
  contents,
  title,
  id,
  onClose,
}: EditorComponentProps) => {
  const router = useRouter();
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
      alert("저장에 성공했습니다!");
      window.location.reload();
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
            <h1 className={styles.title_h1}>글 작성하기</h1>
            <p className={styles.title_label}>제목을 입력해주세요.</p>
            {contents ? (
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date || undefined)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy.MM.dd HH:mm"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                minDate={startDate}
              />
            ) : (
              ""
            )}
            <input
              className={styles.title_input}
              type="text"
              value={currentTitle ? currentTitle : ""}
              onChange={handleTitleChange}
              placeholder={currentTitle ? currentTitle : ""}
            ></input>
            <MenuBar />
          </>
        }
        extensions={extensions}
        content={currentContent ? currentContent : content}
        onUpdate={handleEditorUpdate}
      />
      {contents ? (
        <div className={styles.modal_footer}>
          <button onClick={updateContent} className={styles.button}>
            수정
          </button>
          <button onClick={onClose} className={styles.button}>
            닫기
          </button>
        </div>
      ) : (
        <div className={styles.modal_footer}>
          <button onClick={saveContent} className={styles.button}>
            저장
          </button>
          <button onClick={onClose} className={styles.button}>
            닫기
          </button>
        </div>
      )}
    </>
  );
};

export default EditorComponent;
