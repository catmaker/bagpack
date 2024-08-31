"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { parseISO } from "date-fns";
import DatePicker from "react-datepicker";
import { UserContext } from "@/app/provider/UserProvider";
import useScheduleStore from "@/store/schedule";
import { savePost, updatePost } from "@/utils/axios/fetcher/schedule";
import MenuBar from "./TiptapHeader";
import styles from "./Tiptap.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as any),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO: 'attrs'를 유지하려고 할 때 'marks'가 유지되지 않는 문제를 해결하기 위해 'false'로 설정했습니다.
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO: 'attrs'를 유지하려고 할 때 'marks'가 유지되지 않는 문제를 해결하기 위해 'false'로 설정했습니다.
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
  const userEmail = user?.email;
  console.log(`userEmail${userEmail}`);
  console.log(`post${currentContent}`);
  console.log(`date${selectedDate}`);
  console.log(`mood${selectedMood}`);
  console.log(`title${currentTitle}`);
  useEffect(() => {
    if (contentStartDate) {
      setStartDate(parseISO(contentStartDate));
    }
    if (contentEndDate) {
      setEndDate(parseISO(contentEndDate));
    }
  }, [contentStartDate, contentEndDate]);
  const handleEditorUpdate = ({ editor }: any) => {
    const updatedContent = editor.getHTML();
    setCurrentContent(updatedContent);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(e.target.value); // 입력 필드의 값이 변경될 때마다 currentTitle 업데이트
  };

  const saveContent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!currentContent) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!currentTitle) {
      alert("제목을 입력해주세요.");
      return;
    }

    const getEndDate = (): string => {
      if (endDate) return endDate.toISOString();
      if (startDate) return startDate.toISOString();
      return "error";
    };

    const payload = {
      email: userEmail ?? "error",
      post: currentContent, // 이미 체크했으므로 fallback 불필요
      startDate: startDate?.toISOString() ?? "error",
      endDate: getEndDate(),
      title: currentTitle, // 이미 체크했으므로 fallback 불필요
      mood: selectedMood ?? "error",
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
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const updateContent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Selected Date:", selectedDate);

    const getEndDate = (): string => {
      if (endDate) return endDate.toISOString();
      if (startDate) return startDate.toISOString();
      return "error";
    };

    // 전송될 데이터 객체 생성
    const payload = {
      email: userEmail ?? "error",
      post: currentContent ?? "내용이 없습니다.",
      startDate: startDate ? startDate.toISOString() : "error",
      endDate: getEndDate(),
      title: currentTitle ?? "무제",
      mood: selectedMood ?? "error",
      id: id ?? "error",
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
      router.push("/schedule");
    } catch (error) {
      console.error("Error:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <EditorProvider
        slotBefore={
          <>
            <h1 className={styles.title_h1}>글 작성하기</h1>
            <p className={styles.title_label}>제목을 입력해주세요.</p>
            <input
              className={styles.title_input}
              type="text"
              value={currentTitle || ""}
              onChange={handleTitleChange}
              placeholder={currentTitle || ""}
            />
            {contents ? (
              <div className={styles.datePickerBox}>
                <div className={styles.datePickerWrapper}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      console.log("Date selected:", date);
                      setStartDate(date ?? new Date());
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy.MM.dd HH:mm"
                    showTimeSelect
                    timeFormat="HH:mm"
                  />
                </div>
                <div className={styles.datePickerWrapper}>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      console.log("Date selected:", date);
                      setEndDate(date ?? new Date());
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy.MM.dd HH:mm"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    minDate={startDate}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            <MenuBar />
          </>
        }
        extensions={extensions}
        content={currentContent || content}
        onUpdate={handleEditorUpdate}
      />
      {contents ? (
        <div className={styles.modal_footer}>
          <button
            type="button"
            onClick={updateContent}
            className={styles.button}
          >
            수정
          </button>
          <Link className={styles.button} href={`/schedule/${id}`}>
            닫기
          </Link>
        </div>
      ) : (
        <div className={styles.modal_footer}>
          <button type="button" onClick={saveContent} className={styles.button}>
            저장
          </button>
          <button type="button" onClick={onClose} className={styles.button}>
            닫기
          </button>
        </div>
      )}
    </>
  );
};

export default EditorComponent;
