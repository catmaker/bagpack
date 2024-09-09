import { render, screen } from "@testing-library/react";
import MoodDistributionChart from "../MoodDistributionChart";

jest.mock("react-chartjs-2", () => ({
  Doughnut: () => <div data-testid="doughnut-chart" />,
}));
describe("Home MoodDistributionChart Component Test", () => {
  it("차트 제목이 올바르게 표시되어야 한다.", () => {
    render(
      <MoodDistributionChart
        moodCounts={{ happy: 1, smile: 0, neutral: 0, sad: 0, terrible: 0 }}
      />,
    );
    expect(screen.getByText("감정 분포")).toBeInTheDocument();
  });
  it("데이터가 없을 때 적절한 메시지를 표시해야 한다.", () => {
    render(
      <MoodDistributionChart
        moodCounts={{ happy: 0, smile: 0, neutral: 0, sad: 0, terrible: 0 }}
      />,
    );
    expect(
      screen.getByText("작성한 글이 없어 감정 분포를 확인할 수 없습니다."),
    ).toBeInTheDocument();
  });
  it("데이터가 있을 때 차트를 렌더링해야 한다.", () => {
    render(
      <MoodDistributionChart
        moodCounts={{ happy: 1, smile: 0, neutral: 0, sad: 0, terrible: 0 }}
      />,
    );
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });
  it("접근성 요구사항을 충족해야 한다", () => {
    render(
      <MoodDistributionChart
        moodCounts={{ happy: 1, smile: 0, neutral: 0, sad: 0, terrible: 0 }}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "감정 분포" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-labelledby",
      "mood-distribution-title",
    );
  });
});
