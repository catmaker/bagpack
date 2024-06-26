import React, { useRef } from "react";

// components
import Modal from "@/components/ui/modal/Modal";
import Tiptap from "../tiptap/Tiptap";
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="1000px" minHeight="700px">
      <form action="">
        <Tiptap />
        <button>저장</button>
      </form>
    </Modal>
  );
};

export default PostModal;
