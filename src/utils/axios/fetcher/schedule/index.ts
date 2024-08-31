import axios from "axios";
import axiosInstance from "@/utils/axios/axiosInstance";

// 주어진 이메일을 사용하여 게시물을 가져오는 함수
export const getPosts = async (email: string | undefined) => {
  try {
    // API 요청을 보내서 게시물 데이터를 가져옴
    const response = await axios.post(
      "/api/user/getPost",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // 응답 데이터에서 게시물 데이터를 반환
    return response.data.data;
  } catch (error) {
    // 에러가 Axios 에러인지 확인
    if (axios.isAxiosError(error)) {
      console.error("게시물 가져오기 에러:", {
        message: error.message,
        // 응답이 있는 경우 응답 상태와 데이터를 출력
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
            }
          : null,
        // 요청 설정을 출력
        config: error.config,
      });
    } else {
      // Axios 에러가 아닌 경우 일반 에러 메시지를 출력
      console.error("예상치 못한 에러:", error);
    }
    // 에러를 다시 던져서 호출자에게 알림
    throw error;
  }
};

export const getPostById = async (id: string) => {
  try {
    const response = await axiosInstance.post("/api/user/getPostById", { id });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("게시물 가져오기 에러:", error.message);
    } else {
      console.error("예상치 못한 에러:", error);
    }
    throw error;
  }
};

export const deletePost = async (email: string | undefined, id: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/user/deletePost",
      { email, id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 200) {
      console.log("삭제 성공");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("게시물 삭제 에러:", error.message);
    } else {
      console.error("예상치 못한 에러:", error);
    }
    throw error;
  }
};

export const savePost = async (
  email: string | undefined,
  post: string,
  startDate: string,
  endDate: string,
  title: string,
  mood: string,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/user/post",
      { email, post, startDate, endDate, title, mood },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 200) {
      console.log("저장 성공");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("게시물 저장 에러:", error.message);
    } else {
      console.error("예상치 못한 에러:", error);
    }
    throw error;
  }
};

export const updatePost = async (
  email: string | undefined,
  post: string,
  startDate: string,
  endDate: string,
  mood: string,
  title: string,
  id: string,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/user/updatePost",
      { email, post, startDate, endDate, mood, title, id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 200) {
      console.log("수정 성공");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("게시물 수정 에러:", error.message);
    } else {
      console.error("예상치 못한 에러:", error);
    }
    throw error;
  }
};

export const updatePostDates = async (
  email: string | undefined,
  id: string,
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await axiosInstance.post(
      "/api/user/updatePostDates",
      { email, id, startDate, endDate },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 200) {
      console.log("수정 성공");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("게시물 수정 에러:", error.message);
    } else {
      console.error("예상치 못한 에러:", error);
    }
    throw error;
  }
};
