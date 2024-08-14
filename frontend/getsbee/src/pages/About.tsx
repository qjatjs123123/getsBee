import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ScrollTop } from 'primereact/scrolltop';
import { userState } from '../recoil/userState';
import AboutHeader from '../components/Common/AboutHeader';
import scrap1 from '../assets/scrap1.png';
import scrap2 from '../assets/scrap2.png';
import scrap3 from '../assets/directoryfollow.png';
import scrap4 from '../assets/othersHighlight.png';
import highlighting from '../assets/highlighting.mp4';
import aboutmain from '../assets/aboutmain7.png';
import mainComb from '../assets/mainComb.png';
import './about.css';

const ScrollComponent: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [textSize, setTextSize] = useState<number>(3);
  const [isFixed, setIsFixed] = useState<boolean>(true);
  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(false);
  const [showScrollDown, setShowScrollDown] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const currentUser = useRecoilValue(userState);

  const goToChromeWebStore = () => {
    window.location.href =
      'https://chromewebstore.google.com/detail/getsbee/mkloamglbhkpbaefjpmfggbfbfobeima?utm_source=ext_app_menu';
  };

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [pathname]);

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

      if (scrollPosition > 50) {
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
            // const directionClass = index % 1 === 0 ? 'card-top' : 'card-right';
            const directionClass = 'card-top';
            entry.target.classList.add('visible', directionClass);
            observer.unobserve(entry.target); // 한 번만 애니메이션 실행
          }
        });
      },
      { threshold: 0.1 },
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

  useEffect(() => {
    const handleScroll = () => {
      if (underlineRef.current) {
        const rect = underlineRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 로드 시에도 호출
    return () => window.removeEventListener('scroll', handleScroll);
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
        }}
      >
        <div className="z-30 relative" style={{ pointerEvents: 'auto' }}>
          {!currentUser && (
            <div className="flex items-center absolute opacity-80 top-[40%]  right-[6%] py-1 px-4 rounded-[10px] z-10 justify-center item-center animate-bounce">
              <p className="text-sm text-gray-700 font-bold">
                로그인 할 수 있어요
                <i className="text-sm pi-chevron-right pi"></i>
              </p>
            </div>
          )}
          <AboutHeader />
        </div>
        <div className="absolute z-10 right-32 rounded-xl bottom-10 bg-gray-300 p-3 font-bold text-lg text-[#07294D]">
          크롬익스텐션 하이라이트 시연 영상
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
            className="flex flex-col justify-center items-center text-[#000000] text-5xl z-10  w-full"
          >
            <img
              src={aboutmain}
              alt=""
              className="mt-[2rem]"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ height: '1200px' }}></div>
      <div className="flex flex-col justify-center items-center z-10">
        <div className="flex flex-col w-5/6 mt-16">
          <div
            className="flex my-10 justify-around items-center"
            // ref={(el) => cardRefs.current[0] = el}
          >
            <img
              src={scrap1}
              alt="scrap page"
              className="w-[35rem] mr-10 card"
              ref={(el) => (cardRefs.current[0] = el)}
            />
            <div>
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">
                1
              </div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                원하는 Web 사이트에서 <br /> 바로바로 <span className="font-semibold">스크랩</span>을 진행해보세요.
              </p>
            </div>
          </div>

          <div className="card flex my-10 justify-around items-center">
            <div className="ml-20">
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">
                2
              </div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                Google Gemini에게 <br />
                <span className="font-semibold">핵심 문장 추천</span> 을 받아보세요.
              </p>
            </div>
            <img
              src={scrap2}
              alt="scrap gemini"
              className="w-[35rem] ml-10 card"
              ref={(el) => (cardRefs.current[1] = el)}
            />
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center w-full h-[30rem] bg-[#FDFCE8]">
          <div className="relative flex flex-col justify-center items-center text-gray-500">
            <p className="text-3xl font-semibold mb-3">Highlight Extension :</p>
            <p className="text-4xl">
              당신의 인사이트를{' '}
              <span ref={underlineRef} className={`underline-effect ${isVisible ? 'visible' : ''}`}>
                스크랩
              </span>{' '}
              하세요
            </p>
          </div>
          <div className="relative mt-6">
            <input
              type="button"
              value="Download getsBee"
              className="p-5 bg-amber-400 rounded-2xl text-white text-2xl font-bold mt-10 hover:bg-gray-600"
              onClick={goToChromeWebStore}
            />
          </div>
        </div>

        <div className="flex flex-col w-5/6 mt-10">
          <div className="flex my-10 justify-around items-center">
            <img src={scrap3} alt="scrap gemini" className="card w-[35rem]" ref={(el) => (cardRefs.current[2] = el)} />
            <div className="ml-4">
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">
                3
              </div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                Directory의 <span className="font-semibold">Follow</span> 기능을 통해 <br />
                원하는 포스트를 구독해 보세요.
              </p>
              <p className="pl-5 pt-2 text-amber-500 text-lg font-bold">* 디렉토리를 관리할 수 있어요</p>
            </div>
          </div>

          <div className="flex my-10 justify-around items-center px-[5rem]">
            <div className="ml-10 ">
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">
                4
              </div>
              <p className="text-[#5C5C5C] text-2xl pl-4 w-80">
                같은 URL의 경우 <br />
                다른 유저들의
                <span className="font-semibold"> 하이라이트</span>를 <br />
                함께 볼 수 있어요.
              </p>
            </div>
            <img
              src={scrap4}
              alt="scrap gemini"
              className="w-[35rem] ml-[10rem] card"
              ref={(el) => (cardRefs.current[3] = el)}
            />
          </div>

          {/* <div className="card flex my-10 justify-around items-center">
            <img
              src={scrap1}
              alt="scrap page"
              className="w-[35rem] mr-10 card"
              ref={(el) => (cardRefs.current[4] = el)}
            />
            <div>
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">5</div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                AWS Personalize에게 <br />
                <span className="font-semibold">관련 포스트 추천</span>을 받아보세요.
              </p>
            </div>
          </div> */}
        </div>
        <div className="relative flex justify-around items-center w-full h-[25rem] bg-[#FDFCE8] px-64">
          <img src={mainComb} alt="" className="ml-10 w-64 animate-bounce" />
          <div className="flex flex-col justify-center items-center w-full">
            <div className="relative flex justify-center text-gray-600">
              <p className="text-3xl text-left">
                <span ref={underlineRef} className="text-amber-500 text-5xl font-bold">
                  Getsbee
                </span>{' '}
                <br />
                인사이트 채집하러 가기
              </p>
            </div>
            <div className="relative mt-6">
              <input
                type="button"
                value="Login"
                className="py-5 px-32 bg-amber-400 rounded-2xl text-white text-2xl font-bold mt-10 hover:bg-gray-600"
                onClick={goToChromeWebStore}
              />
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
