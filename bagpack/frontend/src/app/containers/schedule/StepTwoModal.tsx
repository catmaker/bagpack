import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { isWithinInterval, addDays, format } from "date-fns";
import Modal from "@/components/ui/modal/Modal";
import { useDateManagement } from "@/hooks/useDateManagement";
import useScheduleStore from "@/store/schedule";
import { StepTwoModalProps, Post } from "@/types/schedule";
import PostModal from "./PostModal";
import styles from "./StepTwoModal.module.scss";

const StepTwoModal = ({
  isOpen,
  onClose,
  setIsNextModalOpen,
  setIsModalOpen,
}: StepTwoModalProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const { startDate, endDate } = useDateManagement();
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [isDescending, setIsDescending] = useState(true); // 정렬 순서를 추적하는 상태

  const { posts } = useScheduleStore((state) => ({
    selectedMood: state.selectedMood,
    selectedDayOfWeek: state.selectedDayOfWeek,
    setPostsUpdate: state.setPostsUpdate,
    posts: state.posts,
    setPosts: state.setPosts,
  }));

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#fc5353";
      case "medium":
        return "#fe9a8a";
      case "low":
        return "#46a4fc";
      default:
        return "#000"; // 기본 색상
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "happy":
        return "#46a4fc";
      case "sad":
        return "#fc5353";
      case "neutral":
        return "#fe9a8a";
      case "terrible":
        return "#fc5353";
      case "smile":
        return "#57f338";
      default:
        return "#000"; // 기본 색상
    }
  };

  const priorityOrder: { [key: string]: number } = {
    high: 1,
    medium: 2,
    low: 3,
  };

  const handleSortToggle = () => {
    const sorted = [...filteredPosts].sort((a, b) => {
      return isDescending
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    setSortedPosts(sorted);
    setIsDescending(!isDescending); // 정렬 순서를 토글합니다.
    if (process.env.NODE_ENV === "development") {
      console.log(sorted);
    }
  };

  return (
    <>
      <Modal
        className={styles.modal}
        isOpen={isOpen}
        onClose={onClose}
        width="1000px"
        minHeight="90vh"
      >
        <div>
          <div className={styles.nextModal_header}>
            <h1 className={styles.nextModal_h1}>새로운 경험 기록하기</h1>
            <Image
              className={styles.nextModal_plusIcon}
              src="/bagpackIcon/plus.svg"
              width={20}
              height={20}
              alt="post_icon"
              onClick={() => setIsPostModalOpen(true)}
            />
          </div>
          <div className={styles.filterPostListContainer}>
            <p className={styles.filterPostListContainer_p}>
              선택한 기간의 작성한 글 목록
            </p>
            <button onClick={handleSortToggle} className={styles.sortButton}>
              {isDescending ? "중요도 ▲" : "중요도 ▼"}
            </button>
            <ul className={styles.filterPostList}>
              {(sortedPosts.length > 0 ? sortedPosts : filteredPosts).map(
                (filteredItem) => (
                  <li key={filteredItem.id}>
                    <Link href={`/schedule/${filteredItem.id}`}>
                      <span>
                        {formatDate(filteredItem.startDate)}~
                        {formatDate(filteredItem.endDate)}
                      </span>
                      <div>
                        {filteredItem.priority && (
                          <span
                            style={{
                              color: getPriorityColor(filteredItem.priority),
                            }}
                          >
                            {filteredItem.priority}
                          </span>
                        )}
                        {filteredItem.mood && (
                          <span
                            style={{
                              color: getMoodColor(filteredItem.mood),
                            }}
                          >
                            {filteredItem.mood}
                          </span>
                        )}
                      </div>
                      {filteredItem.title}
                    </Link>
                  </li>
                ),
              )}
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
