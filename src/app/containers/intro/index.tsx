"use client";

import React from "react";
import { motion } from "framer-motion";
import Banner from "@/components/ui/banner/Banner";
import Footer from "@/components/ui/Footer/Footer";
import Header from "@/components/ui/header/Header";
import { introSlides } from "@/data/slide";
import CallToActionSection from "./CallToActionSection";
import DisclaimerSection from "./DisclaimerSection";
import FeaturesSection from "./FeaturesSection";
import WelcomeSection from "./WelcomeSection";
import styles from "./index.module.scss";

const Intro = () => {
  return (
    <motion.div className={styles.introContainer}>
      <Header />
      <div className={styles.bannerWrapper}>
        <Banner slides={introSlides} />
      </div>
      <article className={styles.introContent}>
        <WelcomeSection />
        <FeaturesSection />
        <CallToActionSection />
        <DisclaimerSection />
      </article>
      <Footer />
    </motion.div>
  );
};

export default Intro;
