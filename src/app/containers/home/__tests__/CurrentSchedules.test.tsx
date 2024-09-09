import { render, screen } from "@testing-library/react";
import CurrentSchedules from "../CurrentSchedules";

describe("Home CurrentSchedules Component Test", () => {
  it("현재 진행중인 일정이 없을 경우 진행중인 일정이 없다고 표시되어야 한다.", () => {
    render(<CurrentSchedules schedules={[]} />);
    expect(
      screen.getByText("현재 진행 중인 일정이 없습니다."),
    ).toBeInTheDocument();
  });

  it("현재 진행중인 일정이 있을 경우 일정 목록이 표시되어야 한다.", () => {
    render(<CurrentSchedules schedules={[{ id: "1", title: "일정 1" }]} />);
    expect(screen.getByText("일정 1")).toBeInTheDocument();
  });

  it("기본적인 접근성 요구사항을 충족해야 한다.", () => {
    render(<CurrentSchedules schedules={[{ id: "1", title: "일정 1" }]} />);

    // 헤딩이 존재하는지 확인
    expect(
      screen.getByRole("heading", { name: "현재 진행 중인 일정" }),
    ).toBeInTheDocument();
  });
});
