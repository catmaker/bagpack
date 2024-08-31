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
            onClick={(e) => e.stopPropagation()}
            style={{
              width,
              height,
              minHeight,
              minWidth,
              maxHeight: maxHeight || "80vh",
              maxWidth,
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
