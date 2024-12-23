import axios from "axios";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "이미 존재하는 이메일입니다.",
        icon: "error",
      });
      throw new Error("signUp return 데이터가 비어있습니다.");
    }

    const { data } = response;
    console.log(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Swal.fire({
        title: "회원가입 중 에러 발생:",
        text: error.message,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "예상치 못한 에러:",
        text: "error.message",
        icon: "error",
      });
    }
  }
};
