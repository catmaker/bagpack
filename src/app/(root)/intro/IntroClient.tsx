"use client";
import React, { useEffect, useState } from "react";
import LogoIcon from "@/components/ui/icons/LogoIcon";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import styles from "./IntroClient.module.scss";
import { redirect, useRouter } from "next/navigation";
import Header from "@/components/ui/header/Header";

const IntroClient = () => {
  return (
    <motion.div>
      <Header />
      <Image
        src={`/bagpackIcon/bookstore.jpg`}
        alt="wall"
        width={1280}
        height={720}
      ></Image>
    </motion.div>
  );
};

export default IntroClient;
