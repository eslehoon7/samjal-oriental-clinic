import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Award, Star, Compass, CalendarCheck, ShieldCheck, GraduationCap, Beaker, Sparkles, BookOpen } from "lucide-react";

interface SubIntroProps {
  subTab: string;
  setSubTab: (tab: string) => void;
  setActiveTab: (tab: string) => void;
}

const defaultActivities = [
  {
    id: "default-activity-1",
    year: "2024",
    title: "2024 파리 올림픽",
    subtitle: "패럴림픽 국가대표팀 주치의",
    desc: "프랑스 파리 현지 국가대표 한방의학 지원단으로 임명되어 양궁, 사격 등 태극 마크 금메달 주역 종목 전담 한의약 의료팀 대표 주치의 세션을 전담해 직접 임상 진료를 펼쳤습니다.",
    image: "https://firebasestorage.googleapis.com/v0/b/samjal-oriental-clinic.firebasestorage.app/o/site-images%2Factivities%2F%EB%8C%80%EC%99%B8%ED%99%9C%EB%8F%992_24%ED%8C%8C%EB%A6%AC%EC%98%AC%EB%A6%BC%ED%94%BD.jpg?alt=media&token=335fe4df-c4f8-4d23-9acf-3295afae1954",
    order: 2,
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "default-activity-2",
    year: "2020",
    title: "2020 도쿄 올림픽",
    subtitle: "패럴림픽 국가대표팀 주치의",
    desc: "조정, 육상 대한민국 대표팀 전임 전담 침치료 및 상하지 피로 부상 복구 세션을 성공적으로 수행하며 경기력 유지 및 집중 제어에 강력히 기여하였습니다.",
    image: "https://firebasestorage.googleapis.com/v0/b/samjal-oriental-clinic.firebasestorage.app/o/site-images%2Factivities%2F%EB%8C%80%EC%99%B8%ED%99%9C%EB%8F%991_18%ED%95%AD%EC%A0%80%EC%9A%B0.jpg?alt=media&token=bf765b57-952c-4c67-9d8a-6257ddf27652",
    order: 1,
    createdAt: "2020-01-01T00:00:00.000Z"
  }
];

export default function SubIntro({ subTab, setSubTab, setActiveTab }: SubIntroProps) {
  const [activities, setActivities] = useState<any[]>(defaultActivities);

  useEffect(() => {
    // 앞으로 대외활동은 추가 관리가 불필요하므로 최신의 정적 데이터(파리 올림픽 새사진 포함)를 다이렉트로 연계합니다.
    setActivities(defaultActivities);
  }, []);
  
  const subTabs = [
    { id: "philosophy", label: "진료철학" },
    { id: "treatments", label: "고유치료법" },
    { id: "doctors", label: "Research&Clinical Partners" },
    { id: "activities", label: "대외활동" },
  ];

  return (
    <div id="intro-content-view" className="bg-white min-h-screen">
      
      {/* 서브 메인 비주얼 배너 섹션 (Main Section) */}
      <div className="relative w-full h-[380px] sm:h-[480px] bg-[#0F172A] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F2C59]/45 mix-blend-multiply z-10" />
          <img
            src="/images/clinic_interior_modern_1780495390125.png"
            alt="삼잘한의원 소개 배경"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 text-center space-y-3 px-4 animate-fadeIn pt-16">
          <span className="text-sky-400 text-xs sm:text-sm font-sans tracking-widest uppercase font-bold flex items-center justify-center gap-1.5">
            About Samjal Clinic
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans text-white font-extrabold tracking-tight">
            삼잘한의원 소개
          </h1>
          <p className="text-slate-300 font-sans text-sm sm:text-base max-w-lg mx-auto tracking-wide leading-relaxed font-light">
            전통 한방 명가의 영광스러운 여정과<br /> 삼잘(三잘) 수면, 소화기, 비뇨 복원 철학을 소개합니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 정통 스타일 서브 탭 바 */}
        <div className="flex justify-center border-b border-slate-200 mb-16 max-w-3xl mx-auto">
          <div className="flex justify-between items-center w-full -mb-px">
            {subTabs.map((ts) => (
              <button
                key={ts.id}
                onClick={() => setSubTab(ts.id)}
                className={`py-3 px-2 sm:px-4 md:px-6 text-center text-xs sm:text-sm md:text-base font-sans tracking-wide transition-all duration-300 border-b-2 cursor-pointer whitespace-nowrap -mb-px flex-1 ${
                  subTab === ts.id
                    ? "border-[#0F2C59] text-[#0F2C59] font-semibold"
                    : "border-transparent text-slate-500 hover:text-[#0F2C59]"
                }`}
              >
                {ts.label}
              </button>
            ))}
          </div>
        </div>

        {/* 탭내용 구성 */}
        <div className="space-y-16">
          
          {/* 1. 진료철학 */}
          {subTab === "philosophy" && (
            <div className="space-y-12 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-left">
                  <span className="text-xs font-sans text-[#0F2C59] uppercase tracking-widest block font-semibold">
                    Our Vision & Philosophy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans text-[#0F172A] font-bold leading-tight">
                    &ldquo;몸의 자생력을 일깨워 <br /> 건강함을 되찾아 드립니다&rdquo;
                  </h3>
                  <div className="w-12 h-1 bg-[#0F2C59]" />
                  <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed">
                    안녕하세요, 삼잘한의원 원장단입니다. <br />
                    경희대 동방의학 원리를 깊게 이수한 <strong className="font-bold text-[#0F172A]">전문의들의 노하우</strong>와,<br />
                    세계적인 무대에서 태극전사들을 치료한 <strong className="font-bold text-[#0F172A]">임상 통계기술</strong>을 결합하여<br />
                    <strong className="font-bold text-[#0F172A]">근본적인 치료 대안</strong>을 제시합니다.
                  </p>
                  <p className="text-sm font-sans text-slate-500 leading-relaxed">
                    우리 인체는 스스로 복원하고 이겨내는 <strong className="font-bold text-[#0F172A]">무한한 잠재 능력(자생력)</strong>이 구비되어 있습니다.<br />
                    하지만 수면 상태가 어지럽고, 비위에 거친 가스가 차 소화가 불안하며, <br />
                    배하수 장벽이 해독되지 못하면 아무리 훌륭한 신약을 복용해도 <br />
                    병증은 일시적으로 가라앉을 뿐 <strong className="text-[#0F2C59] font-bold">완치에 다다를 수 없습니다.</strong><br />
                    삼잘한의원은 이 <strong className="font-bold text-[#0F172A]">세 가지 인체 근원적 통로</strong>를 깨끗이 세정하고 채워 <br />
                    건강을 <strong className="font-bold text-[#0F172A]">뿌리부터 수립</strong>해 드립니다.
                  </p>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                  <img
                    src="/images/clinic_interior_modern_1780495390125.png"
                    alt="진료철학 메인 이미지"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* 삼잘 특권 자인 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200 w-full divide-y md:divide-y-0 md:divide-x divide-slate-200 rounded-none pt-0 mt-16 bg-white shadow-md overflow-hidden animate-fadeIn">
                <div className="flex flex-col hover:bg-slate-50/65 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="w-full h-64 sm:h-72 overflow-hidden bg-slate-100 relative">
                    <img 
                      src="/images/clinic_interior_modern_1780495390125.png" 
                      alt="수승화강 기류 환경" 
                      className="w-full h-full object-cover filter contrast-125 brightness-95 transition-all duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="py-10 px-8 sm:py-12 sm:px-10 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3 text-left">
                      <div className="relative inline-block">
                        <h4 className="text-lg sm:text-xl font-sans font-bold text-[#0F172A] tracking-wide group-hover:text-[#0F2C59] transition-colors duration-300">수승화강</h4>
                        <span className="block w-6 h-0.5 bg-[#0F2C59]/40 mt-1 ml-0.5 transition-all duration-500 group-hover:w-16 group-hover:bg-[#0F2C59]" />
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 group-hover:text-slate-800 transition-colors duration-300 leading-relaxed break-keep">
                        차가운 기운을 <strong className="font-bold text-slate-900 border-b border-[#0F2C59]/30">신체의 상부(머리)</strong>로 올려 상쾌하게 다스리고, 뜨거운 독기를 <strong className="font-bold text-[#0F2C59]">하부(장/아랫배)</strong>로 돌려 소통 발산시킵니다.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col hover:bg-slate-50/65 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="w-full h-64 sm:h-72 overflow-hidden bg-slate-100 relative">
                    <img 
                      src="/images/hygienic_premium_hanbang_herbal_1780497683155.png" 
                      alt="위수배 안녕 한약 치료" 
                      className="w-full h-full object-cover filter contrast-125 brightness-95 transition-all duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="py-10 px-8 sm:py-12 sm:px-10 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3 text-left">
                      <div className="relative inline-block">
                        <h4 className="text-lg sm:text-xl font-sans font-bold text-[#0F172A] tracking-wide group-hover:text-[#0F2C59] transition-colors duration-300">위수배 안녕</h4>
                        <span className="block w-6 h-0.5 bg-[#0F2C59]/40 mt-1 ml-0.5 transition-all duration-500 group-hover:w-16 group-hover:bg-[#0F2C59]" />
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 group-hover:text-slate-800 transition-colors duration-300 leading-relaxed break-keep">
                        위의 흡수, 수족의 따뜻한 통로 및 하부의 배변을 상호 복구하여 <strong className="font-bold text-slate-900 border-b border-[#0F2C59]/30">소화 위산과 숙변의 유독 가스</strong>를 완전히 환수시킵니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col hover:bg-slate-50/65 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="w-full h-64 sm:h-72 overflow-hidden bg-slate-100 relative">
                    <img 
                      src="https://firebasestorage.googleapis.com/v0/b/samjal-oriental-clinic.firebasestorage.app/o/site-images%2Fcure%2F%EB%8C%80%EA%B4%80%EC%A0%88%20%EB%8F%99%EA%B8%B0%EC%B9%A8%EB%B2%95.jpg?alt=media&token=f5b654c6-5108-47ba-8770-eafa0845ba58" 
                      alt="대관절 동기침법 침술 치료" 
                      className="w-full h-full object-cover filter contrast-125 brightness-95 transition-all duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="py-10 px-8 sm:py-12 sm:px-10 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3 text-left">
                      <div className="relative inline-block">
                        <h4 className="text-lg sm:text-xl font-sans font-bold text-[#0F172A] tracking-wide group-hover:text-[#0F2C59] transition-colors duration-300">대관절 동기침법(고유의 침술)</h4>
                        <span className="block w-6 h-0.5 bg-[#0F2C59]/40 mt-1 ml-0.5 transition-all duration-500 group-hover:w-16 group-hover:bg-[#0F2C59]" />
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-slate-500 group-hover:text-slate-800 transition-colors duration-300 leading-relaxed break-keep">
                        대관절 동기침법과 오장 순환 에센셜 한약 복합 침투 방식으로 <strong className="font-bold text-slate-900">장부 장벽</strong>과 <strong className="font-bold text-[#0F2C59] border-b border-[#0F2C59]/30">심부 골반 관절의 유착</strong>을 동시 치유합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. 고유치료법 */}
          {subTab === "treatments" && (
            <div className="space-y-12 animate-fadeIn text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs font-sans text-[#0F2C59] uppercase tracking-widest block font-semibold">
                    Exclusive Therapeutics
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans text-[#0F172A] font-bold">
                    삼잘한의원만이 보유한 전례 없는 특화 치료법
                  </h3>
                  <div className="w-12 h-1 bg-[#0F2C59]" />
                  
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <h4 className="text-lg sm:text-xl font-sans font-bold text-[#0F172A] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0F2C59]" />
                        대관절 동기침법(고유의 침술)
                      </h4>
                      <p className="text-sm font-sans text-slate-600 leading-relaxed pl-4">
                        경희대병원 출신 한의학 박사이자 패럴림픽 국가대표팀 주치의까지 역임한 제정진 원장이 30년이 넘는 임상경험을 통해서 창안하고 검증한 고유의 침법입니다. 자세분석과 부하검사를 통해 저활성 근육을 진단하고, 장침을 활용해 체간과 주요 관절부위의 속근육을 활성화하는 효과가 있습니다. 결과적으로 신진대사가 원활해지고 관절의 안정성이 향상되어 통증질환 뿐 아니라 내과질환에도 효과적입니다.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg sm:text-xl font-sans font-bold text-[#0F172A] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0F2C59]" />
                        삼잘에센셜(고유의 치료제 라인)
                      </h4>
                      <p className="text-sm font-sans text-slate-600 leading-relaxed pl-4">
                        패럴림픽 국가대표팀 주치의를 역임한 제정진 박사, 경희대병원 출신의 한방재활의학 전문의 전준영 원장, 천연물과학 전문가이자 팜힐연구소 대표 김유정 박사. 전문가 3인이 공동연구해 창안한 삼잘한의원 고유의 치료제입니다. 질환에 따라 가장 효과적인 약재 선별부터 원산지와 품질관리, 성분에 따른 최적의 추출법 적용, 생체이용률 향상을 위한 첨단 제약기술인 SEDDS적용까지 세심하게 설계하고 정성껏 조제하였습니다.
                      </p>
                    </div>


                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/samjal-oriental-clinic.firebasestorage.app/o/site-images%2Fcure%2F%EB%8C%80%EA%B4%80%EC%A0%88%20%EB%8F%99%EA%B8%B0%EC%B9%A8%EB%B2%95.jpg?alt=media&token=f5b654c6-5108-47ba-8770-eafa0845ba58"
                      alt="대관절 동기침법 치료 정경"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                    <img
                      src="/images/hygienic_premium_hanbang_herbal_1780497683155.png"
                      alt="에센셜 프리미엄 한약재"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. 의료진소개 */}
          {subTab === "doctors" && (
            <div className="space-y-12 animate-fadeIn">
              {/* Research & Clinical Partners 연구자문 섹션 */}
              <div className="space-y-10 text-left">
                <div className="text-center space-y-6">
                  <span className="text-[10px] sm:text-xs font-sans text-[#0F2C59] uppercase tracking-widest font-bold block">
                    Research & Clinical Partners
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sans text-[#0F172A] font-bold tracking-tight">
                    삼잘에센셜 연구 자문진 및 임상 파트너
                  </h2>
                </div>

                {/* 위아래 구분을 위한 정갈한 가로 구분선 */}
                <div className="w-full max-w-5xl mx-auto h-[1px] bg-slate-200" />

                <div className="bg-transparent p-0 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 shadow-sm">
                    <img 
                      src="/images/researcher_portrait_1780500341416.png" 
                      alt="김유정 박사 팜힐 천연물 제형 연구소" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>



                  <div className="w-full md:w-1/2 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-sans text-[#0F2C59] font-bold tracking-widest uppercase">
                          Research Partner
                        </span>
                      </div>
                      <h4 className="text-3xl sm:text-4xl font-sans font-bold text-[#0F172A]">
                        김유정 박사
                      </h4>
                      <p className="text-base sm:text-lg font-sans text-[#0F2C59] leading-relaxed italic font-medium pt-1">
                        &ldquo;약재 성분 추출 최적화와 제형 연구를 통해 처방의 생체 <br /> 이용률을 높이는 천연물 과학 전문가&rdquo;
                      </p>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-slate-100">
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-[3px] w-6 h-6 rounded-full bg-[#0F2C59] flex items-center justify-center shadow-md border border-white ring-2 ring-[#0F2C59]/20 z-10 transition-all hover:scale-110 duration-200 text-white text-xs font-sans font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-sans font-bold text-[#0F172A]">
                            서울대학교 대학원 이학박사 <span className="text-[#0F2C59] font-normal text-xs sm:text-sm">(천연물과학 전공)</span>
                          </p>
                          <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed mt-0.5">
                            천연 원료의 고농축 유효성분 추출 최적화 메커니즘과 미량 활성 원료의 생체 이용률 극대화 분야를 집중 연구하여 학위를 취득했습니다.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-10">
                        <div className="absolute left-0 top-[3px] w-6 h-6 rounded-full bg-[#0F2C59] flex items-center justify-center shadow-md border border-white ring-2 ring-[#0F2C59]/20 z-10 transition-all hover:scale-110 duration-200 text-white text-xs font-sans font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-sans font-bold text-[#0F172A]">
                            팜힐 연구소 대표
                          </p>
                          <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed mt-0.5">
                            전통 한방 생약재 본연의 풍부한 약리 성분을 소실 없이 추출하고 이를 캡슐&middot;오일 등 친환경적인 고비율 고순도 액티베이팅 제형으로 가공하는 핵심 기술을 주도하고 있습니다.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-10">
                        <div className="absolute left-0 top-[3px] w-6 h-6 rounded-full bg-[#0F2C59] flex items-center justify-center shadow-md border border-white ring-2 ring-[#0F2C59]/20 z-10 transition-all hover:scale-110 duration-200 text-white text-xs font-sans font-bold">
                          3
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-sans font-bold text-[#0F172A]">
                            전문 아로마테라피스트 & 아로마 임상 자문
                          </p>
                          <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed mt-0.5">
                            유기농 허브와 약리 휘발성 물질의 자극 신호를 임상적으로 수집하여 신경계 스트레스 완화, 가스 팽만 완화 및 면역력 조절 메커니즘을 심도 있게 접목시켰습니다.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-10">
                        <div className="absolute left-0 top-[3px] w-6 h-6 rounded-full bg-[#0F2C59] flex items-center justify-center shadow-md border border-white ring-2 ring-[#0F2C59]/20 z-10 transition-all hover:scale-110 duration-200 text-white text-xs font-sans font-bold">
                          4
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-sans font-bold text-[#0F172A]">
                            대표 저서: 《아로마테라피 클래스》 <span className="text-[#0F2C59] text-xs font-normal border border-[#0F2C59]/30 px-1.5 py-0.5 rounded bg-slate-100">(중앙대학교 출판사)</span>
                          </p>
                          <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed mt-0.5">
                            천연 아로마 및 과학적 한방 에센셜 성분을 체계와 적응증에 맞추어 현대적인 일상 가이드라인과 힐링 솔루션으로 구성한 전문 서적을 집필하였습니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 bg-[#F8FAFC] p-4 rounded-xl border border-slate-200">
                      <p className="text-sm sm:text-base font-sans text-[#0F2C59] font-semibold">
                        삼잘에센셜 처방 천연물 제형 과학 자문위원 <br /> (Natural Product Formulation Advisor)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 단축 유도 슬롯 */}
              <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-4">
                <p className="text-lg font-sans text-[#0F2C59] font-semibold">
                  &ldquo;진료받을지 고민된다면 먼저 친절히 상담해 보세요&rdquo;
                </p>
                <div className="flex justify-center flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setActiveTab("reservation");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-6 py-2.5 bg-[#0F2C59] text-white font-sans hover:bg-[#0F172A] rounded-lg text-sm font-bold tracking-wider transition-all cursor-pointer"
                  >
                    온라인 예약하기 &rarr;
                  </button>
                  <a
                    href="tel:02-6952-4067"
                    className="px-6 py-2.5 bg-white border border-slate-200 font-sans text-slate-700 hover:bg-slate-50 rounded-lg text-sm tracking-wider transition-all flex items-center justify-center cursor-pointer"
                  >
                    대표번호 상담전화
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 4. 대외활동 */}
          {subTab === "activities" && (
            <div className="space-y-16 animate-fadeIn text-left">
              <div className="text-center space-y-6">
                <span className="text-xs font-sans text-[#0F2C59] uppercase tracking-widest block font-bold">
                  National Team Doctor Activities
                </span>
                <h3 className="text-2xl sm:text-3xl font-sans text-[#0F172A] font-bold">
                  태극전사들이 믿고 의지한 삼잘의 치료 손길
                </h3>
              </div>
              
              {/* 대외활동 타임라인 레이아웃 (사용자 스크린샷 100% 매치) */}
              <div className="relative max-w-5xl mx-auto py-12 px-4">
                {/* 세로 중앙 관통선 (데스크톱) / 왼쪽 정렬선 (모바일) */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2 z-0" />
                
                <div className="space-y-24 relative z-10">
                  
                  {activities.map((act, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div key={act.id || index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
                        {isEven ? (
                          <>
                            {/* 이미지 카드 (왼쪽) */}
                            <div className="flex md:justify-end order-1 pl-12 md:pl-0 w-full">
                              <div className="w-full max-w-lg aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 shadow-md">
                                <img
                                  src={act.image || "/images/clinic_interior_modern_1780495390125.png"}
                                  alt={act.title}
                                  className="w-full h-full object-cover object-top"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>
                            
                            {/* 중앙 타임라인 도트 (절대 위치) */}
                            <div className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                              <div className="w-5 h-5 rounded-full border border-[#0F2C59]/40 bg-white flex items-center justify-center shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-[#0F2C59]" />
                              </div>
                            </div>
                            
                            {/* 텍스트 컨텐츠 (오른쪽) */}
                            <div className="space-y-2.5 order-2 pl-12 md:pl-0">
                              <h4 className="text-2xl sm:text-3xl font-sans text-[#0F2C59] font-semibold leading-tight">
                                {act.title}
                              </h4>
                              <p className="text-slate-500 font-sans text-sm sm:text-base tracking-wide">
                                {act.subtitle}
                              </p>
                              <p className="text-sm font-sans text-slate-600 leading-relaxed max-w-sm pt-2 text-left">
                                {act.desc}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* 텍스트 컨텐츠 (왼쪽) */}
                            <div className="space-y-2.5 order-2 md:order-1 text-left md:text-right pl-12 md:pl-0">
                              <h4 className="text-2xl sm:text-3xl font-sans text-[#0F2C59] font-semibold leading-tight">
                                {act.title}
                              </h4>
                              <p className="text-slate-500 font-sans text-sm sm:text-base tracking-wide">
                                {act.subtitle}
                              </p>
                              <p className="text-sm font-sans text-slate-600 leading-relaxed max-w-sm md:ml-auto pt-2 text-left md:text-right">
                                {act.desc}
                              </p>
                            </div>
                            
                            {/* 중앙 타임라인 도트 (절대 위치) */}
                            <div className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                              <div className="w-5 h-5 rounded-full border border-[#0F2C59]/40 bg-white flex items-center justify-center shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-[#0F2C59]" />
                              </div>
                            </div>
                            
                            {/* 이미지 카드 (오른쪽) */}
                            <div className="flex md:justify-start order-1 md:order-2 pl-12 md:pl-0 w-full">
                              <div className="w-full max-w-lg aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 shadow-md">
                                <img
                                  src={act.image || "/images/samjal_crew_professional_1780495405627.png"}
                                  alt={act.title}
                                  className="w-full h-full object-cover object-[center_30%]"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
