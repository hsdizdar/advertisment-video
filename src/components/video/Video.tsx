import { FC, useRef, useEffect, useState } from "react";

interface VideoProps {
  source: string;
}

const Video: FC<VideoProps> = ({ source }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    console.log("useEffect");

    const options = {
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handlePlay = (entries: Array<IntersectionObserverEntry>) => {
      console.log("handlePlay: ", entries);

      entries.forEach((entry) => {
        console.log("handlePlay forEach: ", entry.isIntersecting);

        if (entry.isIntersecting) {
          console.log("autoPlay: ", videoRef.current?.autoplay);
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handlePlay, options);

    console.log("observer: ", observer);
    console.log("videoRef.current: ", videoRef.current);

    observer.observe(videoRef.current as Element);
  }, []);

  const handleDuration = () => {
    const currentTime = videoRef?.current?.currentTime!;

    const calc = (currentTime / duration).toFixed(2);

    if (calc === "0.25") {
      console.log("%25");
    } else if (calc === "0.50") {
      console.log("%50");
    } else if (calc === "0.75") {
      console.log("%75");
    }
  };

  const handleLoad = () => {
    const duration = videoRef.current?.duration;
    setDuration(duration || 0);
  };

  const handleEnd = () => {
    console.log("Video is ended.");
  };

  return (
    <video
      style={{ width: "100%" }}
      ref={videoRef}
      src={source}
      onTimeUpdate={handleDuration}
      onEnded={handleEnd}
      onLoadedData={handleLoad}
      data-testid="video"
      controls
      muted
    />
  );
};

export default Video;
