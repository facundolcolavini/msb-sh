import { type FunctionalComponent, type JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

interface Props {
  slides: string[];
  sliderTime?: number;
  children: JSX.Element | JSX.Element[];
}

const BannerSlider: FunctionalComponent<Props> = ({ slides, sliderTime = 5000, children }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  /* Auto slide */
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, sliderTime);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, nextSlide, sliderTime]);

  const currentSlide = slides[currentIndex];

  return (

    <section class="relative z-0 bg-no-repeat  bg-cover h-[100vh] md:h-[70vh] w-full max-w-[100vw] group">
      <div
        className="w-full h-full bg-center bg-cover duration-500 animate-fade absolute top-0 left-0 "
        style={{
          backgroundImage: `url(${currentSlide})`,
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          loading: 'lazy',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity here (0.5 is 50%)
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
        {children}
      </div>
    </section>
  );

};

export default BannerSlider;
