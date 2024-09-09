import { render, screen } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import { motivationalQuotes } from "@/data/motivation";
import WelcomeSection from "../WelcomeSection";

jest.mock("@/data/motivation", () => ({
  motivationalQuotes: [
    "오늘은 모든 일이 잘 될 것이다.",
    "오늘은 모든 일이 잘 될 것이다2.",
    "오늘은 모든 일이 잘 될 것이다3.",
  ],
}));
describe("Home WelcomeSection Component Test", () => {
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
  beforeEach(() => {
    // math.random 모킹
    jest.spyOn(Math, "random").mockReturnValue(0.5); // 이 값은 랜덤하게 생성되는 값이므로 0.5로 고정
  });
  afterEach(() => {
    jest.restoreAllMocks(); // restoreAllMocks 메서드를 사용하여 모든 모킹을 원래대로 복원
  });
  it("사용자 정보가 정확히 렌더링 되어야 한다.", () => {
    render(<WelcomeSection user={mockUser} />);
    expect(
      screen.getByText(mockUser.nickname, { exact: false }),
    ).toBeInTheDocument();
  });
  it("오늘의 동기부여 한 줄이 제대로 렌더링 되어야 한다.", () => {
    render(<WelcomeSection user={mockUser} />);

    // 목업 값이 0.5이므로 두번째 값이 렌더링 되어야 함
    expect(
      screen.getByText("오늘은 모든 일이 잘 될 것이다2."),
    ).toBeInTheDocument();
  });
  it("모든 인용구가 선택될 수 있어야 한다.", () => {
    const mathRandomSpy = jest.spyOn(Math, "random");
    const selectedQuotes = new Set();

    // 충분한 횟수만큼 테스트를 반복
    // 인용구 개수의 100배만큼 반복하여 모든 인용구가 선택될 확률을 높이기
    for (let i = 0; i < motivationalQuotes.length * 100; i++) {
      // 0, 1, 2 중 하나를 랜덤하게 선택
      mathRandomSpy.mockReturnValue((i % 3) / 3);
      const { unmount } = render(<WelcomeSection user={mockUser} />);

      const quoteElements = screen.getAllByText(/오늘은 모든 일이/);
      const selectedQuote = quoteElements[quoteElements.length - 1].textContent;
      selectedQuotes.add(selectedQuote);

      //   console.log(`선택된 인용구: ${selectedQuote}`); // 선택된 인용구 로깅

      unmount();
    }

    // console.log(`선택된 인용구 개수: ${selectedQuotes.size}`);
    // console.log(`선택된 인용구: ${Array.from(selectedQuotes).join(", ")}`);

    // 모든 인용구가 적어도 한 번 이상 선택되었는지 확인
    expect(selectedQuotes.size).toBe(motivationalQuotes.length);

    mathRandomSpy.mockRestore();
  });
});
