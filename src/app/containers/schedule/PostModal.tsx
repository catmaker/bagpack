import React, { useRef } from "react";

// components
import Modal from "@/components/ui/modal/Modal";
import Tiptap from "@/components/tiptap/Tiptap";
// zustand
import useScheduleStore from "@/store/schedule";

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const PostModal = ({ isOpen, onClose }: PostModalProps) => {
  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const selectedDayOfWeek = useScheduleStore(
    (state) => state.selectedDayOfWeek,
  );
  const selectedMood = useScheduleStore((state) => state.selectedMood);
  console.log(selectedDate + selectedDayOfWeek + selectedMood);
  const postHandler = async (event: React.FormEvent) => {
    event.preventDefault();
  };
  const handleCloseModal = () => {
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="1000px" minHeight="90vh">
      <form action="">
        <Tiptap onClose={handleCloseModal} />
      </form>
    </Modal>
  );
};

export default PostModal;
