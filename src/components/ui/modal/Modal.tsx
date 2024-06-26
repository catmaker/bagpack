"use client";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  className?: string;
  buttonText?: string;
  buttonClassName?: string;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  width,
  height,
  minHeight,
  minWidth,
  className,
  buttonText = "닫기",
  buttonClassName,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modal_overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className={`${styles.modal_content} ${className || ""}`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
            style={{
              width: width,
              height: height,
              minHeight: minHeight,
              minWidth: minWidth,
            }}
          >
            {children}
            <button className={buttonClassName} onClick={onClose}>
              {buttonText}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
