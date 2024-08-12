import React, { useRef, useEffect, useState } from 'react';
import AboutHeader from '../components/Common/AboutHeader';
import scrap1 from '../assets/scrap1.png';
import scrap2 from '../assets/scrap2.png';
import highlightWebSite from '../assets/highlightWebSite.mp4';
import highlightRecommend from '../assets/highlightRecommend.mp4';
import aboutmain from '../assets/aboutmain6.png';

const ScrollComponent: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [textSize, setTextSize] = useState<number>(3); // 초기 텍스트 크기
  const [isFixed, setIsFixed] = useState<boolean>(true); // 텍스트의 고정 상태
  const [isScrollingEnabled, setIsScrollingEnabled] = useState<boolean>(false); // 스크롤 가능 여부

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // 비디오 속도 조절
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current?.offsetTop ?? 0;
      console.log("scrollPosition: " + scrollPosition);
      console.log("sectionTop: " + sectionTop);

      if (scrollPosition < sectionTop + 200) {
        const scale = Math.max(0.115, 3 - scrollPosition / 5); // 텍스트 크기 조절
        setTextSize(scale);
        setIsFixed(true); // 텍스트 고정
        setIsScrollingEnabled(false); // 스크롤 비활성화
      } else if (textSize === 1) { // 글자가 완전히 줄어들었을 때만
        setIsScrollingEnabled(true); // 스크롤 활성화
        setIsFixed(false); // 텍스트 고정 해제
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

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 스크롤 Y 위치에 따라 h1 요소의 top 값을 계산
  const h1Top = scrollY > 600 ? `${50 - (scrollY - 400)}px` : '0px';

  return (
    <div>
      {/* 비디오 배경과 텍스트 */}
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
        <AboutHeader />
        <div
          ref={sectionRef}
          className="relative flex flex-col justify-center items-center w-full h-[38rem] bg-[#FDFCE8] mt-[-1rem]"
          style={{ overflowY: isScrollingEnabled ? 'scroll' : 'hidden' }} // 스크롤 제어
        >
          {/* 배경 비디오 */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            src={highlightWebSite}
            className="absolute top- left-0 w-full h-full object-cover"
            style={{ objectPosition: 'bottom' }}
          />
          {/* 연한 회색 오버레이 */}
           {/* <div className="absolute top-0 left-0 w-full h-full bg-[#FDFCE8] opacity-50" /> */}
          {/* 비디오 위에 위치한 콘텐츠 */}
          <div
            style={{
              transform: `scale(${textSize * 9})`,
              transition: 'transform 0.2s ease-out',
              position: isFixed ? 'fixed' : 'relative', // 스크롤에 따라 텍스트 위치 조정
              top: isFixed ? '10%' : 'auto', // 텍스트가 화면 가운데에 고정되도록 설정
              zIndex: 10,
            }}
            className="flex flex-col justify-center items-center text-[#000000] text-5xl">
            <img src={aboutmain} alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>
      {/* 페이지를 스크롤할 수 있도록 충분히 긴 콘텐츠 */}
      <div style={{ height: '1200px' }}></div>
      <div className="flex flex-col justify-center items-center z-10">
        {/* section 2 */}
        <div className="flex flex-col w-5/6 mt-10">
          {/* card 1 */}
          <div className="flex my-10 justify-around items-center">
            <img src={scrap1} alt="scrap page" className="w-[35rem] mr-10" />
            <div>
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">1</div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                원하는 Web 사이트에서 <br /> 바로바로 <span className="font-semibold">스크랩</span> 을 진행해보세요.
              </p>
            </div>
          </div>
          {/* card 2 */}
          <div className="flex my-10 justify-around items-center">
            <div className="ml-20">
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">2</div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                Google Gemini에게 <br />
                <span className="font-semibold">핵심 문장 추천</span> 을 받아보세요.
              </p>
            </div>
            <img src={scrap2} alt="scrap gemini" className="w-[35rem] ml-10" />
          </div>
          {/* card 3 */}
          <div className="flex my-10 justify-around items-center">
            <img src={scrap2} alt="scrap gemini" className="w-[35rem] ml-10" />
            <div className="ml-20">
              <div className="w-8 h-8 rounded-full text-[#ffffff] font-semibold text-xl bg-amber-400 flex justify-center items-center">3</div>
              <p className="text-[#5C5C5C] text-2xl pl-5">
                원하는 정보만 보고 싶다!<br />
                <span className="font-semibold">디렉토리 팔로우</span> 해보세요.
              </p>
            </div>
          </div>
        </div>
        {/* section 3 */}
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
      </div>
      {/* footer */}
      <div className="flex justify-center items-center pt-10">
        <p className="text-xl text-[#5C5C5C]">© 2024 getsBee. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ScrollComponent;
