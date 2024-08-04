import React, { useState, useContext, useEffect } from "react";
import Modal from "@/components/ui/modal/Modal";
import Image from "next/image";
import styles from "./StepTwoModal.module.scss";
import PostModal from "./PostModal";
// zustand
import useScheduleStore from "@/store/schedule";
//
import { UserContext } from "@/app/provider/UserProvider";
import Link from "next/link";
type StepTwoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsNextModalOpen: (isOpen: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};
type Post = {
  id: string;
  content: string;
  mood: string;
  title: string;
  startDate: string;
  endDate: string;
};

const StepTwoModal = ({
  isOpen,
  onClose,
  setIsNextModalOpen,
  setIsModalOpen,
}: StepTwoModalProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const mood = useScheduleStore((state) => state.selectedMood);
  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const user = useContext(UserContext);
  const startDate = useScheduleStore((state) => state.startDate);
  const setStartDate = useScheduleStore((state) => state.setStartDate);
  const endDate = useScheduleStore((state) => state.endDate);
  const setEndDate = useScheduleStore((state) => state.setEndDate);
  const selectedDayOfWeek = useScheduleStore(
    (state) => state.selectedDayOfWeek,
  );
  const setPostsUpdate = useScheduleStore((state) => state.setPostsUpdate);
  const posts = useScheduleStore((state) => state.posts);
  const setPosts = useScheduleStore((state) => state.setPosts);
  console.log(selectedDate);

  useEffect(() => {
    handleGetPosts(); // 컴포넌트가 마운트될 때 포스트 데이터 가져오기
  }, [user, setPostsUpdate]);

  const handleGetPosts = async () => {
    try {
      const response = await fetch("/api/user/getPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
        }),
      });
      if (!response.ok) {
        throw new Error("Error fetching posts");
      }
      const data = await response.json();
      setPosts(data.data);
      console.log(data.data);
      setPostsUpdate(false);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredPosts = posts.filter((item) => {
    if (!startDate || !endDate) return false;
    const startDateObj = new Date(item.startDate);
    const endDateObj = new Date(item.endDate);
    return (
      startDateObj >= new Date(startDate) &&
      startDateObj < new Date(endDate.getTime() + 86400000) // 86400000은 하루를 밀리초로 환산한 값
    );
  });
  console.log("Filtered Posts:", filteredPosts);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로
    const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로
    return `${year}. ${month}. ${day}`; // 마지막 마침표 없음
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        width="1000px"
        minHeight="90vh"
        buttonClassName={styles.modal_close}
      >
        <div>
          <div className={styles.nextModal_header}>
            <h1 className={styles.nextModal_h1}>
              {/* {startDate && endDate
                ? `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()} - ${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()}`
                : startDate
                  ? `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()}`
                  : endDate
                    ? `${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()}`
                    : "날짜를 선택해주세요"} */}
              새로운 경험 기록하기
            </h1>
            <Image
              className={styles.nextModal_plusIcon}
              src={"/bagPackIcon/plus.svg"}
              width={20}
              height={20}
              alt="post_icon"
              onClick={() => setIsPostModalOpen(true)}
            />
          </div>
          <div>
            <p>선택한 기간의 작성한 글 목록</p>
            <ul className={styles.filterPostList}>
              {filteredPosts.map((filteredItem) => (
                <li key={filteredItem.id}>
                  <Link href={`/schedule/${filteredItem.id}`}>
                    <span>
                      {formatDate(filteredItem.startDate)}~
                      {formatDate(filteredItem.endDate)}
                    </span>
                    {filteredItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => {
              setIsNextModalOpen(false); // 현재 모달 닫기
              setIsModalOpen(true); // 이전 모달 열기
            }}
            className={styles.prevButton}
          >
            뒤로가기
          </button>
        </div>
      </Modal>
      {isPostModalOpen && (
        <PostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
        />
      )}
    </>
  );
};

export default StepTwoModal;
