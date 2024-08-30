import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "@/app/provider/UserProvider";
import Modal from "@/components/ui/modal/Modal";
// zustand
import useScheduleStore from "@/store/schedule";
// axios
import { getPosts } from "@/utils/axios/fetcher/schedule";
import PostModal from "./PostModal";
import styles from "./StepTwoModal.module.scss";

type StepTwoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsNextModalOpen: (isOpen: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

const StepTwoModal = ({
  isOpen,
  onClose,
  setIsNextModalOpen,
  setIsModalOpen,
}: StepTwoModalProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const selectedMood = useScheduleStore((state) => state.selectedMood);
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
  const handleGetPosts = async () => {
    try {
      const data = await getPosts(user?.email);
      setPosts(data);
      setPostsUpdate(false);
    } catch (error) {
      console.error("게시물 가져오기 중 에러 발생:", error);
    }
  };
  useEffect(() => {
    handleGetPosts();
  }, [user, setPostsUpdate]);

  console.log(`
    Mood: ${selectedMood}
    Start Date: ${startDate}
    End Date: ${endDate}
    Selected Date: ${selectedDate}
`);

  const filteredPosts = posts.filter((item) => {
    if (!startDate || !endDate) return false;
    const startDateObj = new Date(item.startDate);
    const endDateObj = new Date(item.endDate);
    return (
      startDateObj >= new Date(startDate) &&
      startDateObj < new Date(endDate.getTime() + 86400000) // 86400000은 하루를 밀리초로 환산한 값
    );
  });
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로
    const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로
    return `${year}. ${month}. ${day}`; // 마지막 마침표 없음
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} width="1000px" minHeight="90vh">
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
              src="/bagPackIcon/plus.svg"
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
            type="button"
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
