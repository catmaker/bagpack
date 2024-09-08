"use client";

import React from "react";
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
  maxHeight?: string;
  maxWidth?: string;
  isMobile?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  width,
  height,
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  className,
  isMobile,
}: ModalProps) => {
  const modalVariants = isMobile
    ? {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
      }
    : {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -50, opacity: 0 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${styles.modal_overlay} ${isMobile ? styles.mobile_overlay : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className={`${styles.modal_content} ${className || ""} ${isMobile ? styles.mobile_content : ""}`}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: isMobile ? "100%" : width,
              height: isMobile ? "auto" : height,
              minHeight: isMobile ? "auto" : "auto",
              minWidth: isMobile ? "auto" : minWidth,
              maxHeight: isMobile ? "80vh" : maxHeight,
              maxWidth: isMobile ? "100%" : maxWidth,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
