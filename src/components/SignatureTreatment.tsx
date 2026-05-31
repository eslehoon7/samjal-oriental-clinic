import { Key, Syringe, TreePine, HeartHandshake } from "lucide-react";

interface SignatureTreatmentProps {
  setActiveTab: (tab: string) => void;
  setIntroSubTab?: (subTab: string) => void;
}

export default function SignatureTreatment({ setActiveTab, setIntroSubTab }: SignatureTreatmentProps) {
  const treatments = [
    {
      image: "/src/assets/images/acupuncture_treatment_1779805206489.png",
      category: "대관절 동기침법",
      title: "침놓는사진",
      desc: "심부근육의 활성을 높이는 대관절 동기침법",
      detail: "국가대표 자궁 및 관절 스포츠 침술 기법을 현대적으로 승화시켜 깊숙한 핵심 유착을 관통 치료합니다.",
      targetSubTab: "treatments",
      icon: <Syringe className="w-5 h-5 text-[#C5A059]" />
    },
    {
      image: "/src/assets/images/herbal_medicine_1779805229983.png",
      category: "프리미엄 지상 조제",
      title: "에센셜 한약사진",
      desc: "전문가 3인의 협업으로 탄생한 프리미엄 치료제",
      detail: "식약처 정밀 무독성 잔류농약 검사를 마친 최상위 명품 탕재만을 사용하여 비위에 순한 기를 채웁니다.",
      targetSubTab: "treatments",
      icon: <TreePine className="w-5 h-5 text-[#C5A059]" />
    },
    {
      image: "/src/assets/images/samjal_crew_1779805249409.png",
      category: "국가대표 주치의 사단",
      title: "크루 사진",
      desc: "체계적인 연구와 진심어린 치료",
      detail: "의학 논문과 정밀 통계 임상을 기반으로 환자의 편안한 신체 회복을 위해 주 2회 학술 심포지엄을 개최합니다.",
      targetSubTab: "doctors",
      icon: <HeartHandshake className="w-5 h-5 text-[#C5A059]" />
    }
  ];

  const handleCardClick = (subTab: string) => {
    setActiveTab("intro");
    if (setIntroSubTab) {
      setIntroSubTab(subTab);
    }
    setTimeout(() => {
      const el = document.getElementById("intro-content-view");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <section className="pt-24 pb-0 bg-[#FDFBF7]/50 border-b border-[#DFD5C6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        {/* 상단 훈장 문단 */}
        <div className="text-center space-y-4">
          <p className="text-xs sm:text-sm font-serif text-[#C5A059] tracking-[0.3em] uppercase font-bold text-center">
            Signature treatments
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2A2826] font-bold tracking-tight text-center">
            삼잘한의원의 고유 치유 비법
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="text-sm font-serif text-[#5C6351] max-w-lg mx-auto leading-relaxed pt-2 text-center">
            증상의 표면만을 가리는 일시적 처방이 아닙니다. 원인이 깃든 심부와 근본부터 다스리는 삼잘만의 3대 비법 클리닉을 소개합니다.
          </p>
        </div>
      </div>

      {/* 3대 비법 한페이지 가득 차는 와이드 패널 아코디언 쇼케이스 (Full Wide Immersive Showcase) */}
      <div className="w-full h-[550px] sm:h-[650px] flex flex-col md:flex-row overflow-hidden border-t border-b border-[#DFD5C6]/30 bg-[#2A2826] select-none shadow-xl">
        {treatments.map((tr, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(tr.targetSubTab)}
            className="relative flex-1 group hover:flex-[2.5] transition-all duration-700 ease-in-out overflow-hidden cursor-pointer flex flex-col justify-end p-8 sm:p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-[#DFD5C6]/15"
          >
            {/* 배경 이미지 및 오버레이 */}
            <div className="absolute inset-0 z-0">
              {/* 이미지 확대 효과 */}
              <img
                src={tr.image}
                alt={tr.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                referrerPolicy="no-referrer"
              />
              {/* 기본적으로 어둠을 주어 텍스트 시인성을 확보하고, 호버시 더 선명하게 가로막 */}
              <div className="absolute inset-0 bg-stone-950/70 group-hover:bg-stone-950/60 transition-colors duration-700 z-10" />
              {/* 브라운 시그니처 톤 필터 매직 조합 */}
              <div className="absolute inset-0 bg-[#A67C52]/15 mix-blend-multiply group-hover:bg-transparent transition-all duration-700 z-10" />
            </div>

            {/* 본문 정보 영역 */}
            <div className="relative z-20 space-y-4 pointer-events-none">
              {/* 카테고리 태그 */}
              <div>
                <span className="inline-block px-3 py-1 bg-[#C5A059] text-[#2A2826] text-[10px] sm:text-xs font-serif font-bold tracking-widest uppercase rounded shadow-sm">
                  {tr.category}
                </span>
              </div>

              {/* 제목 및 아이콘 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  {tr.icon}
                  <span className="text-xs font-serif font-bold tracking-widest uppercase">
                    {tr.title}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-bold leading-snug tracking-tight">
                  {tr.desc}
                </h3>
              </div>

              {/* 호버 시 부드럽게 아코디언처럼 위로 서서히 열리는 정밀 디테일 섹션 */}
              <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[160px] transition-all duration-700 ease-in-out overflow-hidden space-y-4">
                <p className="text-xs sm:text-sm font-serif text-[#DFD5C6]/90 leading-relaxed pt-2">
                  {tr.detail}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
                  <span className="font-serif">치료 철학 및 임상 상세보기</span>
                  <span className="text-base font-serif">→</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
