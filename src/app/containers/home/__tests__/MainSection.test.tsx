import { render, screen, waitFor, act } from "@testing-library/react";
import { mockUser } from "@/mocks/mockData";
import MainSection from "../MainSection";

const mockFetchPosts = jest.fn().mockImplementation(async (user) => {
  // 모의 데이터 반환
  return Promise.resolve({
    data: [
      {
        id: "1",
        title: "일정 1",
        content: "일정 1 내용",
        createdAt: new Date(),
        updatedAt: new Date(),
        mood: "happy",
        schedule: "일정 1 일정",
      },
    ],
  });
});

jest.mock("@/store/schedule", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    posts: [],
    fetchPosts: mockFetchPosts,
  })),
}));

jest.mock("@/hooks/useCurrentSchedules", () => ({
  __esModule: true,
  default: jest.fn(() => []),
}));

jest.mock("@/hooks/usePostStatistics", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    monthlyPostCounts: {},
    totalPosts: 0,
    moodCounts: {},
  })),
}));
jest.mock(
  "../CurrentSchedules.tsx",
  () =>
    function () {
      return <div data-testid="current-schedules">Current Schedules</div>;
    },
);
jest.mock(
  "../MonthlyPostChart.tsx",
  () =>
    function () {
      return <div data-testid="monthly-post-chart">Monthly Post Chart</div>;
    },
);
jest.mock(
  "../MoodDistributionChart.tsx",
  () =>
    function () {
      return (
        <div data-testid="mood-distribution-chart">Mood Distribution Chart</div>
      );
    },
);
jest.mock(
  "../StatisticsItems.tsx",
  () =>
    function () {
      return <div data-testid="statistics-items">Statistics Items</div>;
    },
);

describe("Home MainSection Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("데이터 로딩 후 컨텐츠를 표시해야 한다.", async () => {
    await act(async () => {
      render(<MainSection user={mockUser} />);
    });
    await waitFor(() =>
      expect(screen.getByRole("group")).toHaveAttribute(
        "aria-label",
        "차트 통계",
      ),
    );
  });

  it("하위 컴포넌트가 렌더링 되어야 한다.", async () => {
    await act(async () => {
      render(<MainSection user={mockUser} />);
    });
    await waitFor(() =>
      expect(screen.getByText("Current Schedules")).toBeInTheDocument(),
    );
    expect(screen.getByText("Current Schedules")).toBeInTheDocument();
    expect(screen.getByText("Monthly Post Chart")).toBeInTheDocument();
    expect(screen.getByText("Mood Distribution Chart")).toBeInTheDocument();
    expect(screen.getByText("Statistics Items")).toBeInTheDocument();
  });
});
