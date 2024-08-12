import React, { useEffect, useRef, useState } from 'react';
import AboutHeader from '../components/Common/AboutHeader';
import scrap1 from '../assets/scrap1.png';
import scrap2 from '../assets/scrap2.png';
import scrap3 from '../assets/directoryfollow.png';
import scrap4 from '../assets/othersHighlight.png';
import highlighting from '../assets/highlighting.mp4';
import aboutmain from '../assets/aboutmain7.png';
import { ScrollTop } from 'primereact/scrolltop';
import './about.css'; // CSS 파일을 import 합니다.

const ScrollComponent: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [textSize, setTextSize] = useState<number>(3);
  const [isFixed, setIsFixed] = useState<boolean>(true);
  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(false);
  const [showScrollDown, setShowScrollDown] = useState<boolean>(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current?.offsetTop ?? 0;

      if (scrollPosition < sectionTop + 200) {
        const scale = Math.max(0.115, 3 - scrollPosition / 5);
        setTextSize(scale);
        setIsFixed(true);
        setIsScrollingEnabled(false);
      } else if (textSize === 1) {
        setIsScrollingEnabled(true);
        setIsFixed(false);
      }

      if (scrollPosition > 100) {
        setShowScrollDown(false);
      } else {
        setShowScrollDown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [textSize]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const h1Top = scrollY > 600 ? `${50 - (scrollY - 400)}px` : '0px';

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            const directionClass = index % 2 === 0 ? 'card-left' : 'card-right';
            entry.target.classList.add('visible', directionClass);
            observer.unobserve(entry.target); // 한 번만 애니메이션 실행
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: h1Top,
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'top',
          width: '100%',
          zIndex: 5,
        }}>
        <div className="z-30 relative" style={{ pointerEvents: 'auto' }}>
          <AboutHeader />
        </div>

        {showScrollDown && (
          <div className="flex flex-col items-center absolute opacity-80 bottom-10 bg-[#d9d9d9] left-[45%] py-3 px-8 rounded-[40px] z-10 text-gray-800 justify-center item-center">
            <i className="pi pi-arrow-circle-down animate-bounce text-4xl"></i>
            <p className="text-xl">Scroll down</p>
            <ScrollTop />
          </div>
        )}

        <div
          ref={sectionRef}
          className="relative flex flex-col justify-center items-center w-full h-[38rem] bg-[#FDFCE8] mt-[1rem]"
          style={{ overflowY: isScrollingEnabled ? 'scroll' : 'hidden' }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            src={highlighting}
            className="absolute left-0 w-full h-full object-cover"
            style={{ objectPosition: 'bottom' }}
          />
          <div
            style={{
              transform: `scale(${textSize * 9})`,
              transition: 'transform 0.2s ease-out',
              position: isFixed ? 'fixed' : 'relative',
              top: isFixed ? '10%' : 'auto',
              zIndex: 10,
            }}
            className="flex flex-col justify-center items-center text-[#000000] text-5xl z-10">
            <img src={aboutmain} alt="" className="mt-[2rem]" />
            <img src="" alt="" />
          </div>
        </div>
      </div>

      <div style={{ height: '1200px' }}></div>
      <div className="flex flex-col justify-center items-center z-10">
        <div className="flex flex-col w-5/6 mt-10">
          <div
            className="card flex my-10 justify-around items-center"
            ref={(el) => cardRefs.current[0] = el}
          >
            <img src={scrap1} alt="scrap page" className="w-[35rem] mr-10" />
            <div>
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">1</div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                원하는 Web 사이트에서 <br /> 바로바로 <span className="font-semibold">스크랩</span>을 진행해보세요.
              </p>
            </div>
          </div>

          <div
            className="card flex my-10 justify-around items-center"
            ref={(el) => cardRefs.current[1] = el}
          >
            <div className="ml-20">
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">2</div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                Google Gemini에게 <br />
                <span className="font-semibold">핵심 문장 추천</span> 을 받아보세요.
              </p>
            </div>
            <img src={scrap2} alt="scrap gemini" className="w-[35rem] ml-10" />
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center w-full h-[30rem] bg-[#FDFCE8]">
          <div className="relative flex flex-col justify-center items-center text-gray-500">
            <p className="text-3xl font-semibold mb-3">Highlight Extension :</p>
            <p className="text-4xl">
              당신의 인사이트를 <span>스크랩</span> 하세요
            </p>
          </div>
          <div className="relative mt-12">
            <input
              type="button"
              value="Download getsBee"
              className="p-5 bg-amber-400 rounded-2xl text-white text-2xl font-bold mt-10"
            />
          </div>
        </div>

        <div className="flex flex-col w-5/6 mt-10">
          <div
            className="card flex my-10 justify-around items-center"
            ref={(el) => cardRefs.current[2] = el}
          >
            <img src={scrap3} alt="scrap gemini" className="w-[35rem]" />
            <div className="ml-4">
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">3</div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                Directory의 Follow 기능을 통해 <br />
                <span className="font-semibold">하이라이트</span>를<br />
                관리하고 발전시켜보세요.
              </p>
            </div>
          </div>

          <div
            className="card flex my-10 justify-around items-center px-[5rem]"
            ref={(el) => cardRefs.current[3] = el}
          >
            <div className="ml-10 ">
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">4</div>
              <p className="text-[#5C5C5C] text-2xl pl-4 mr-16">
                getsBee와 함께 여러분의 <br />
                <span className="font-semibold">하이라이트</span>를 <br />
                함께 제공합니다.
              </p>
            </div>
            <img src={scrap4} alt="scrap gemini" className="w-[35rem] ml-[10rem]" />
          </div>

          <div
            className="card flex my-10 justify-around items-center"
            ref={(el) => cardRefs.current[4] = el}
          >
            <img src={scrap1} alt="scrap page" className="w-[35rem] mr-10" />
            <div>
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">5</div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                AWS Personalize에게 <br />
                <span className="font-semibold">관련 포스트 추천</span>을 받아보세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center pt-10">
        <p className="text-xl text-[#5C5C5C]">© 2024 getsBee. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ScrollComponent;
