import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Video from "./Video";

describe("useIntersectionObserver", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();

    mockIntersectionObserver.mockReturnValue({
      observe: () => jest.fn(),
      thresholds: 0.5,
    });

    window.IntersectionObserver = mockIntersectionObserver;
  });

  const source = "https://cdn.yoc.com/ad/demo/airbnb.mp4";

  it("should render video", async () => {
    const { container } = render(<Video source={source} />);
    const video = screen.getByTestId("video");
    expect(video).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should play video when clicked", async () => {
    const { container } = render(<Video source={source} />);
    const video = screen.getByTestId("video");
    expect(video).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      userEvent.click(video);
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should video end", async () => {
    const { container } = render(<Video source={source} />);
    const video = screen.getByTestId("video");
    expect(video).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      userEvent.click(video);
    });
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      video.dispatchEvent(new Event("ended"));
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should play video when appears 50%", async () => {
    const { container } = render(<Video source={source} />);
    const video = screen.getByTestId("video");
    expect(video).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      video.dispatchEvent(new Event("isIntersection"));
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
