import React from "react";
import Login from "@/app/containers/login";
import Header from "@/components/ui/header/Header";

const LoginPage = () => {
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
      <Login />
    </div>
  );
};

export default LoginPage;
