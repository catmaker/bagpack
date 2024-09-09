import { render, screen } from "@testing-library/react";
import StatisticsItem from "../StatisticsItems";

describe("Home StatisticsItems Component Test", () => {
  it("타이틀과 값이 표시되어야 한다.", () => {
    render(<StatisticsItem title="총 글 수" value={10} />);
    expect(
      screen.getByRole("heading", { name: "총 글 수" }),
    ).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("접근성 요구사항을 충족해야 한다.", () => {
    render(<StatisticsItem title="총 글 수" value={10} />);
    const valueElement = screen.getByText("10");
    expect(valueElement).toHaveAttribute("aria-label", "총 글 수: 10");
  });
});
