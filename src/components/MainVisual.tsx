import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";

interface MainVisualProps {
  setActiveTab: (tab: string) => void;
  setIntroSubTab?: (subTab: string) => void;
}

export default function MainVisual({ setActiveTab, setIntroSubTab }: MainVisualProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/images/clinic_interior_modern_1780495390125.png",
      title: "몸이 스스로 치유하는 자생력",
      subtitle: "전통 한방 명가, 삼잘한의원",
      desc: (
        <>
          수면, 소화, 배설의 근본적 균형(삼잘)을 통해 질병 이전의 건강한 활력을 온전히 복원해 드립니다.
        </>
      ),
      linkTab: "intro",
      subTab: "philosophy",
    },
    {
      image: "/images/samjal_crew_professional_1780495405627.png",
      title: "대한민국 국가대표 주치의 의료진",
      subtitle: "신뢰와 전문성으로 답하는 정성진료",
      desc: (
        <>
          올림픽 국가대표 및 패럴림픽 대표팀 주치의 출신 <br />
          전준영·제정진 원장 등 각 분야 최고 권위의 의료진이 케어합니다.
        </>
      ),
      linkTab: "intro",
      subTab: "treatments",
    },
    {
      image: "/images/professional_clean_acupuncture_1780497559621.png",
      title: "대관절 동기침법 & 한방 골관절 집중치료",
      subtitle: "신경과 심부 고질 깊숙한 통증의 원인 교정",
      desc: (
        <>
          단순 통증 완화를 넘어, 꼬여 있는 골반경락 및 심부 관절의 정렬을<br />
          그 현장에서 바로 회복시키는 특수 침법입니다.
        </>
      ),
      linkTab: "intro",
      subTab: "activities",
    },
    {
      image: "/images/hygienic_premium_hanbang_herbal_1780497683155.png",
      title: "식약처 인증 무독성 에센셜 한약제조",
      subtitle: "전문가 3인이 수공으로 조제하는 최고의 한약",
      desc: (
        <>
          철저한 가택 중탕 제조 방식으로 유효 한방 약성을 최대로 보존하며<br />
          장과 자궁, 위를 안전하게 회복시킵니다.
        </>
      ),
      linkTab: "subject",
    },
  ];

  // 4초마다 자동 슬라이딩 (사용자 조건 만족)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleSlideClick = (slide: typeof slides[0]) => {
    setActiveTab(slide.linkTab);
    if (setIntroSubTab && slide.subTab) {
      setIntroSubTab(slide.subTab);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="relative bg-[#F8FAFC]">
      {/* 슬라이더 영역 */}
      <div className="relative h-screen min-h-[600px] w-full overflow-hidden border-b border-slate-200">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* 배경 이미지 비칠 때 겹치는 다크/네이비 그라데이션 필터 (위생적인 분위기) */}
            <div 
              onClick={() => handleSlideClick(slide)}
              className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F2C59]/40 mix-blend-multiply z-10 cursor-pointer" 
            />
            <img
              onClick={() => handleSlideClick(slide)}
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out cursor-pointer"
              style={{ transform: idx === currentIndex ? "scale(1.05)" : "scale(1)" }}
              referrerPolicy="no-referrer"
            />
            {/* 정교한 서예 및 타이포그래피 콘텐츠 */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center px-3 py-1 bg-[#0F2C59]/30 border border-[#0F2C59]/60 rounded-full text-slate-100 text-xs">
                    <span className="font-sans tracking-widest">{slide.subtitle}</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl md:text-[44px] lg:text-5xl font-sans text-white font-bold tracking-tight drop-shadow-md whitespace-nowrap">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed font-light drop-shadow">
                    {slide.desc}
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => handleSlideClick(slide)}
                      className="px-6 py-3 bg-[#0F2C59] hover:bg-[#1E40AF] text-white transition-all duration-300 rounded-lg text-sm font-sans font-semibold tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      자세히 알아보기
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("reservation");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-slate-300/40 hover:border-white transition-all rounded-lg text-sm font-sans tracking-wider"
                    >
                      온라인 예약 / AI 분석
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 좌우 이동 화살표 */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/15 hover:bg-white/35 text-white transition-colors"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/15 hover:bg-white/35 text-white transition-colors"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* 인디케이터 도트 */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-[#0F2C59] w-6" : "bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
