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
import { savePost, updatePost } from "@/utils/axios/fetcher/schedule";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";

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
  contentStartDate?: string;
  contentEndDate?: string;
};

const EditorComponent = ({
  contents,
  title,
  id,
  onClose,
  contentStartDate,
  contentEndDate,
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
      startDate: startDate ? startDate.toISOString() : "error", // startDate가 Date 객체라면 ISO 문자열로 변환
      endDate: endDate
        ? endDate.toISOString()
        : startDate
          ? startDate.toISOString()
          : "error", // endDate가 Date 객체라면 ISO 문자열로 변환, startDate가 undefined이면 "error" 사용
      title: currentTitle ?? "무제", // currentTitle이 undefined이면 "무제" 사용
      mood: selectedMood ?? "error", // selectedMood가 undefined이면 "error" 사용
    };

    console.log(payload);

    try {
      await savePost(
        payload.email,
        payload.post,
        payload.startDate,
        payload.endDate,
        payload.title,
        payload.mood,
      );
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
      startDate: startDate ? startDate.toISOString() : "error", // startDate가 Date 객체라면 ISO 문자열로 변환
      endDate: endDate
        ? endDate.toISOString()
        : startDate
          ? startDate.toISOString()
          : "error", // endDate가 Date 객체라면 ISO 문자열로 변환, startDate가 undefined이면 "error" 사용
      title: currentTitle ?? "무제", // currentTitle이 undefined이면 "무제" 사용
      mood: selectedMood ?? "error", // selectedMood가 undefined이면 "error" 사용
      id: id ?? "error", // id가 undefined이면 "error" 사용
    };
    // 전송될 데이터 로그로 출력
    console.log("Sending payload:", payload);

    try {
      await updatePost(
        payload.email,
        payload.post,
        payload.startDate,
        payload.endDate,
        payload.mood,
        payload.title,
        payload.id,
      );
      setPostsUpdate(true);
      alert("수정에 성공했습니다!");
      window.location.reload();
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
              <>
                <div className={styles.datePickerWrapper}>
                  <DatePicker
                    selected={
                      startDate
                        ? startDate
                        : contentStartDate
                          ? parseISO(contentStartDate)
                          : undefined
                    }
                    onChange={(date) => setStartDate(date || undefined)}
                    selectsStart
                    startDate={
                      startDate
                        ? startDate
                        : contentStartDate
                          ? parseISO(contentStartDate)
                          : undefined
                    }
                    endDate={
                      endDate
                        ? endDate
                        : contentEndDate
                          ? parseISO(contentEndDate)
                          : undefined
                    }
                    dateFormat="yyyy.MM.dd HH:mm"
                    showTimeSelect
                    timeFormat="HH:mm"
                  />
                </div>
                <div className={styles.datePickerWrapper}>
                  <DatePicker
                    selected={
                      endDate
                        ? endDate
                        : contentEndDate
                          ? parseISO(contentEndDate)
                          : undefined
                    }
                    onChange={(date) => setEndDate(date || undefined)}
                    selectsEnd
                    startDate={
                      startDate
                        ? startDate
                        : contentStartDate
                          ? parseISO(contentStartDate)
                          : undefined
                    }
                    endDate={
                      endDate
                        ? endDate
                        : contentEndDate
                          ? parseISO(contentEndDate)
                          : undefined
                    }
                    dateFormat="yyyy.MM.dd HH:mm"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    minDate={
                      startDate
                        ? startDate
                        : contentStartDate
                          ? parseISO(contentStartDate)
                          : undefined
                    }
                  />
                </div>
              </>
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
