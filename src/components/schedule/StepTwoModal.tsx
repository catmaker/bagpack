import React, { useState, useContext, useEffect } from "react";
import Modal from "@/components/ui/modal/Modal";
import Image from "next/image";
import styles from "@/app/(root)/schedule/ScheduleClient.module.scss";
import PostModal from "@/components/schedule/PostModal";
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
  date: string;
  mood: string;
  title: string;
};

const StepTwoModal = ({
  isOpen,
  onClose,
  setIsNextModalOpen,
  setIsModalOpen,
}: StepTwoModalProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const mood = useScheduleStore((state) => state.selectedMood);
  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const user = useContext(UserContext);

  const selectedDayOfWeek = useScheduleStore(
    (state) => state.selectedDayOfWeek,
  );
  console.log(selectedDate);

  useEffect(() => {
    handleGetPosts(); // 컴포넌트가 마운트될 때 포스트 데이터 가져오기
  }, [user]);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} width="1000px" minHeight="700px">
        <div>
          <div className={styles.nextModal_header}>
            <h1 className={styles.nextModal_h1}>
              {selectedDate
                ? `${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()} ${selectedDate.getHours()}:${selectedDate.getMinutes().toString().padStart(2, "0")} ${selectedDayOfWeek} `
                : "날짜를 선택해주세요"}
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
            <ul>
              {posts
                .filter((post) => {
                  if (!selectedDate) return false;
                  // selectedDate와 post.date를 Date 객체로 변환
                  const selectedDateObj = new Date(selectedDate);
                  const postDateObj = new Date(post.date);

                  // 년, 월, 일 비교
                  return (
                    selectedDateObj.getFullYear() ===
                      postDateObj.getFullYear() &&
                    selectedDateObj.getMonth() === postDateObj.getMonth() &&
                    selectedDateObj.getDate() === postDateObj.getDate()
                  );
                })
                .map((filteredPost) => (
                  // 조건에 맞는 경우에만 post.content 표시
                  <Link
                    href={`/schedule/${filteredPost.id}`}
                    key={filteredPost.id}
                  >
                    {filteredPost.title}
                  </Link>
                ))}
            </ul>
          </div>
          <button
            onClick={() => {
              setIsNextModalOpen(false); // 현재 모달 닫기
              setIsModalOpen(true); // 이전 모달 열기
            }}
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
