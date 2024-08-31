import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { isWithinInterval, addDays, format } from "date-fns";
import Modal from "@/components/ui/modal/Modal";
// zustand
import { useDateManagement } from "@/hooks/useDateManagement";
import useScheduleStore from "@/store/schedule";
// axios
import { StepTwoModalProps } from "@/types/schedule";
import PostModal from "./PostModal";
import styles from "./StepTwoModal.module.scss";

const StepTwoModal = ({
  isOpen,
  onClose,
  setIsNextModalOpen,
  setIsModalOpen,
}: StepTwoModalProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const {
    selectedDate,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
  } = useDateManagement();

  const { selectedMood, selectedDayOfWeek, setPostsUpdate, posts, setPosts } =
    useScheduleStore((state) => ({
      selectedMood: state.selectedMood,
      selectedDayOfWeek: state.selectedDayOfWeek,
      setPostsUpdate: state.setPostsUpdate,
      posts: state.posts,
      setPosts: state.setPosts,
    }));

  if (process.env.NODE_ENV === "development") {
    console.log(`
    Mood: ${selectedMood}
    Start Date: ${startDate}
    End Date: ${endDate}
      Selected Date: ${selectedDate}
    `);
  }

  const filteredPosts = useMemo(() => {
    if (!startDate || !endDate) return [];

    return posts.filter((item) => {
      const postStartDate = new Date(item.startDate);
      return isWithinInterval(postStartDate, {
        start: startDate,
        end: addDays(endDate, 1),
      });
    });
  }, [posts, startDate, endDate]);

  const formatDate = useCallback((dateString: string) => {
    return format(new Date(dateString), "yyyy. MM. dd");
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} width="1000px" minHeight="90vh">
        <div>
          <div className={styles.nextModal_header}>
            <h1 className={styles.nextModal_h1}>새로운 경험 기록하기</h1>
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
