"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./index.module.scss";
import Header from "@/components/ui/header/Header";
import Banner from "@/components/ui/banner/Banner";
import Link from "next/link";
import Footer from "@/components/ui/Footer/Footer";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import WelcomeSection from "./WelcomeSection";
import FeaturesSection from "./FeaturesSection";
import CallToActionSection from "./CallToActionSection";
import DisclaimerSection from "./DisclaimerSection";
const Intro = () => {
  const slides = [
    {
      title: "Welcome to Our TimeInK",
      subtitle: "We are glad to have you here!",
      imageUrl: "/bagpackIcon/banner.jpg",
    },
    {
      title: "Our Services",
      subtitle: "We offer a variety of services to help you.",
      imageUrl: "/bagpackIcon/banner2.jpg",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <motion.div>
        <Header />
        <div className={styles.imageBox}>
          <Banner slides={slides} />
        </div>
        <article className={styles.articleIntro}>
          <WelcomeSection />
          <FeaturesSection />
          <CallToActionSection />
          <DisclaimerSection />
        </article>
        <Footer />
      </motion.div>
    </Suspense>
  );
};

export default Intro;
