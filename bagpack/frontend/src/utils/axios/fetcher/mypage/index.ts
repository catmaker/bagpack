import axios from "axios";
import axiosInstance from "@/utils/axios/axiosInstance";

// 이메일과 닉네임을 받아 유저 닉네임 수정하기
export const updateUserNickname = async (email: string, nickname: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/user/updateUserNickname",
      {
        email,
        nickname,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("서버 응답:", response.data); // 성공 시 응답 로깅
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("mypage/updateUserNickname 에서 에러 발생: ", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error(
        "mypage/updateUserNickname 에서 알 수 없는 에러 발생: ",
        error,
      );
    }
    throw error;
  }
};

// 이메일과 비밀번호를 받아 유저 비밀번호 수정하기
export const updateUserPassword = async (newPassword: string) => {
  try {
    const response = await axiosInstance.post("/api/user/updateUserPassword", {
      newPassword,
    });
    console.log("서버 응답:", response.data); // 성공 시 응답 로깅
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("mypage/updateUserPassword 에서 에러 발생: ", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error(
        "mypage/updateUserPassword 에서 알 수 없는 에러 발생: ",
        error,
      );
    }
    throw error;
  }
};
