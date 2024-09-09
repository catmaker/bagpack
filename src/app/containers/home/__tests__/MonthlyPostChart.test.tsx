import { render, screen } from "@testing-library/react";
import MonthlyPostChart from "../MonthlyPostChart";

jest.mock("react-chartjs-2", () => ({
  Bar: () => <div data-testid="bar-chart" />,
}));

describe("Home MonthlyPostChart Component Test", () => {
  it("데이터가 없을 때 적절한 메시지를 표시해야 한다.", () => {
    const emptyData = new Array(12).fill(0);
    render(<MonthlyPostChart monthlyPostCounts={emptyData} />);
    expect(
      screen.getByText("작성한 글이 없어 월별 글 수를 확인할 수 없습니다."),
    ).toBeInTheDocument();
  });
  it("데이터가 있을 때 차트를 렌더링해야 한다.", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    render(<MonthlyPostChart monthlyPostCounts={data} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });
  it("차트 제목이 올바르게 표시되어야 한다.", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    render(<MonthlyPostChart monthlyPostCounts={data} />);
    expect(screen.getByText("월별 글 수")).toBeInTheDocument();
  });
  it("접근성 요구사항을 충족해야 한다", () => {
    const data = [1, 0, 3, 0, 2, 1, 0, 0, 4, 2, 1, 0];
    render(<MonthlyPostChart monthlyPostCounts={data} />);
    expect(
      screen.getByRole("heading", { name: "월별 글 수" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-labelledby",
      "monthly-post-chart-title",
    );
  });
});
