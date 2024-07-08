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
  const [posts, setPosts] = useState<Post[]>([]);
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
              {startDate && endDate
                ? `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, "0")} - ${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes().toString().padStart(2, "0")}`
                : startDate
                  ? `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes().toString().padStart(2, "0")}`
                  : endDate
                    ? `${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes().toString().padStart(2, "0")}`
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
                .filter((item) => {
                  const startDateObj = new Date(item.startDate);
                  const endDateObj = new Date(item.endDate);
                  const filterStartDateObj = new Date(
                    "2024-07-01T00:00:00.000Z",
                  );
                  const filterEndDateObj = new Date("2024-07-27T00:00:00.000Z");

                  // item의 startDate와 endDate가 필터링 기간 안에 있는지 확인
                  return (
                    startDateObj <= filterEndDateObj &&
                    endDateObj >= filterStartDateObj
                  );
                })
                .map((filteredItem) => (
                  <Link
                    href={`/schedule/${filteredItem.id}`}
                    key={filteredItem.id}
                  >
                    {filteredItem.title}
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
