import React from "react";
// components
import Tiptap from "@/components/tiptap/Tiptap";
import Modal from "@/components/ui/modal/Modal";
// zustand
import useScheduleStore from "@/store/schedule";
import { PostModalProps } from "@/types/schedule";

const PostModal = ({ isOpen, onClose }: PostModalProps) => {
  const { selectedDate, selectedDayOfWeek, selectedMood } = useScheduleStore(
    (state) => ({
      selectedDate: state.selectedDate,
      selectedDayOfWeek: state.selectedDayOfWeek,
      selectedMood: state.selectedMood,
    }),
  );
  if (process.env.NODE_ENV === "development") {
    console.log({ selectedDate, selectedDayOfWeek, selectedMood });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="1000px" minHeight="90vh">
      <form onSubmit={(e) => e.preventDefault()}>
        <Tiptap onClose={onClose} />
      </form>
    </Modal>
  );
};

export default PostModal;
