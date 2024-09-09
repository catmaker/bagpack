import { render, screen } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import UserSection from "../UserSection";
// jest.mock을 사용하여 컴포넌트에서 사용하는 외부 모듈을 모킹할 수 있다.
jest.mock("next/image", () => ({
  __esModule: true, // 모듈이 ES 모듈로 취급되도록 설정
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

describe("Home UserSection Component Test", () => {
  const mockUser = {
    email: "test@example.com",
    isDone: false,
    nickname: "테스트",
    palette: ["#000000", "#FFFFFF"],
    created_at: Timestamp.fromDate(new Date()),
    posts: [],
    id: "1",
    profilePictureUrl: "test.jpg",
  };

  it("사용자 정보가 정확하게 렌더링되어야 한다.", () => {
    render(<UserSection user={mockUser} />);
    expect(
      screen.getByRole("heading", { name: mockUser.nickname }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockUser.nickname}의 프로필 사진`),
    ).toBeInTheDocument();
  });
  it("접근성 요구사항을 충족해야 한다.", () => {
    render(<UserSection user={mockUser} />);
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-label",
      "사용자 프로필",
    );
    expect(screen.getByText("이메일:")).toHaveClass("srOnly");
    expect(
      screen.getByAltText(`${mockUser.nickname}의 프로필 사진`),
    ).toBeInTheDocument();
  });
});
