import axios from "axios";

export const signUp = async (
  email: string,
  password: string,
  nickname: string,
) => {
  try {
    const response = await axios.post(
      "/api/user/signUp",
      {
        email,
        password,
        nickname,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // HTTP 상태 코드가 200-299 범위에 있는지 확인
    if (response.status < 200 || response.status >= 300) {
      alert("이미 존재하는 이메일입니다.");
      throw new Error("signUp return 데이터가 비어있습니다.");
    }

    const { data } = response;
    console.log(data);
    alert("회원가입이 완료되었습니다.");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("회원가입 중 에러 발생:", {
        message: error.message,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
            }
          : null,
        config: error.config,
      });
    } else {
      console.error("예상치 못한 에러:", error);
    }
  }
};
