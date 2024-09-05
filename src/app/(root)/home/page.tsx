import React from "react";
import Home from "@/app/containers/home";
import Header from "@/components/ui/header/Header";

const HomePage = () => {
  return (
    <div
      style={{
        background: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <Home />
    </div>
  );
};

export default HomePage;
