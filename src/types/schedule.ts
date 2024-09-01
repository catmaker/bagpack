export type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
export type StepOneModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleGoToNextModal: () => void;
  user: any;
  handleMoodClick: (mood: string) => void;
};

export type StepTwoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsNextModalOpen: (isOpen: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

// [id]
export type Post = {
  id: string;
  content: string;
  mood: string;
  title: string;
  startDate: string;
  endDate: string;
  priority: string;
};

export type ScheduleDetailParams = {
  id: string;
};

export type ScheduleDetailProps = {
  params: ScheduleDetailParams;
  data: Post;
};

// [id]/modify
export type ModifyProps = {
  params: {
    id: string;
  };
  data: Post;
};
