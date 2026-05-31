import { Award, Star, Compass, CalendarCheck, ShieldCheck, GraduationCap, Beaker, Sparkles, BookOpen } from "lucide-react";

interface SubIntroProps {
  subTab: string;
  setSubTab: (tab: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function SubIntro({ subTab, setSubTab, setActiveTab }: SubIntroProps) {
  
  const subTabs = [
    { id: "philosophy", label: "진료철학" },
    { id: "treatments", label: "고유치료법" },
    { id: "doctors", label: "의료진소개" },
    { id: "activities", label: "대외활동" },
  ];

  return (
    <div id="intro-content-view" className="bg-[#FDFBF7] min-h-screen">
      
      {/* 서브 메인 비주얼 배너 섹션 (Main Section) */}
      <div className="relative w-full h-[560px] sm:h-[720px] bg-[#2A2826] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A2826]/85 to-[#A67C52]/35 mix-blend-multiply z-10" />
          <img
            src="/images/clinic_interior_1779805270752.png"
            alt="삼잘한의원 소개 배경"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 text-center space-y-3 px-4 animate-fadeIn">
          <span className="text-[#C5A059] text-xs sm:text-sm font-serif tracking-widest uppercase font-bold flex items-center justify-center gap-1.5">
            About Samjal Clinic
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-extrabold tracking-tight">
            삼잘한의원 소개
          </h1>
          <p className="text-[#DFD5C6] font-serif text-sm sm:text-base max-w-lg mx-auto tracking-wide leading-relaxed font-light">
            전통 한방 명가의 영광스러운 여정과<br /> 삼잘(三잘) 수면, 소화기, 비뇨 복원 철학을 소개합니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 정통 스타일 서브 탭 바 */}
        <div className="flex justify-center border-b border-[#DFD5C6]/40 mb-16 max-w-xl mx-auto">
          <div className="grid grid-cols-4 w-full">
            {subTabs.map((ts) => (
              <button
                key={ts.id}
                onClick={() => setSubTab(ts.id)}
                className={`py-3 text-center text-sm sm:text-base font-serif tracking-wider transition-all duration-300 border-b-2 cursor-pointer ${
                  subTab === ts.id
                    ? "border-[#CEAD6F] text-[#CEAD6F] font-semibold"
                    : "border-transparent text-[#2A2826]/70 hover:text-[#CEAD6F]"
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
                <div className="space-y-6">
                  <span className="text-xs font-serif text-[#C5A059] uppercase tracking-widest block font-semibold">
                    Our Vision & Philosophy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2826] font-bold leading-tight">
                    &ldquo;몸의 자생력을 일깨워 <br /> 건강함을 되찾아 드립니다&rdquo;
                  </h3>
                  <div className="w-12 h-1 bg-[#C5A059]" />
                  <p className="text-base sm:text-lg font-serif text-[#706B65] leading-relaxed">
                    안녕하세요, 삼잘한의원 원장단입니다. <br />
                    경희대 동방의학 원리를 깊게 이수한 <strong className="font-bold text-[#2A2826]">전문의들의 노하우</strong>와,<br />
                    세계적인 무대에서 태극전사들을 치료한 <strong className="font-bold text-[#2A2826]">임상 통계기술</strong>을 결합하여<br />
                    <strong className="font-bold text-[#2A2826]">근본적인 치료 대안</strong>을 제시합니다.
                  </p>
                  <p className="text-sm font-serif text-[#7A8071] leading-relaxed">
                    우리 인체는 스스로 복원하고 이겨내는 <strong className="font-bold text-[#2A2826]">무한한 잠재 능력(자생력)</strong>이 구비되어 있습니다.<br />
                    하지만 수면 상태가 어지럽고, 비위에 거친 가스가 차 소화가 불안하며, <br />
                    배하수 장벽이 해독되지 못하면 아무리 훌륭한 신약을 복용해도 <br />
                    병증은 일시적으로 가라앉을 뿐 <strong className="text-[#C58059] font-bold">완치에 다다를 수 없습니다.</strong><br />
                    삼잘한의원은 이 <strong className="font-bold text-[#2A2826]">세 가지 인체 근원적 통로</strong>를 깨끗이 세정하고 채워 <br />
                    건강을 <strong className="font-bold text-[#2A2826]">뿌리부터 수립</strong>해 드립니다.
                  </p>
                </div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#DFD5C6] shadow-lg">
                  <img
                    src="/images/clinic_interior_1779805270752.png"
                    alt="진료철학 메인 이미지"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* 삼잘 특권 자인 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#DFD5C6] w-full divide-y md:divide-y-0 md:divide-x divide-[#DFD5C6] rounded-none pt-0 mt-16 bg-white shadow-md overflow-hidden animate-fadeIn">
                <div className="flex flex-col hover:bg-[#FDFBF7]/60 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="w-full h-64 sm:h-72 overflow-hidden bg-[#FDFBF7] relative">
                    <img 
                      src="/images/clinic_interior_1779805270752.png" 
                      alt="수승화강 기류 환경" 
                      className="w-full h-full object-cover filter grayscale contrast-120 brightness-95 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-[20%] group-hover:contrast-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="py-10 px-8 sm:py-12 sm:px-10 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="relative inline-block">
                        <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2A2826] tracking-wide group-hover:text-[#C5A059] transition-colors duration-300">수승화강</h4>
                        <span className="block w-6 h-0.5 bg-[#C5A059]/40 mt-1 ml-0.5 transition-all duration-500 group-hover:w-16 group-hover:bg-[#C5A059]" />
                      </div>
                      <p className="text-xs sm:text-sm font-serif text-[#5C6351] group-hover:text-[#2A2826] transition-colors duration-300 leading-relaxed break-keep">
                        차가운 기운을 <strong className="font-bold text-[#2A2826] border-b border-[#C5A059]/30">신체의 상부(머리)</strong>로 올려 상쾌하게 다스리고, 뜨거운 독기를 <strong className="font-bold text-[#C5A059]">하부(장/아랫배)</strong>로 돌려 소통 발산시킵니다.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col hover:bg-[#FDFBF7]/60 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="w-full h-64 sm:h-72 overflow-hidden bg-[#FDFBF7] relative">
                    <img 
                      src="/images/herbal_medicine_1779805229983.png" 
                      alt="위수배 안녕 한약 치료" 
                      className="w-full h-full object-cover filter grayscale contrast-120 brightness-95 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-[20%] group-hover:contrast-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="py-10 px-8 sm:py-12 sm:px-10 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="relative inline-block">
                        <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2A2826] tracking-wide group-hover:text-[#C5A059] transition-colors duration-300">위수배 안녕</h4>
                        <span className="block w-6 h-0.5 bg-[#C5A059]/40 mt-1 ml-0.5 transition-all duration-500 group-hover:w-16 group-hover:bg-[#C5A059]" />
                      </div>
                      <p className="text-xs sm:text-sm font-serif text-[#5C6351] group-hover:text-[#2A2826] transition-colors duration-300 leading-relaxed break-keep">
                        위의 흡수, 수족의 따뜻한 통로 및 하부의 배변을 상호 복구하여 <strong className="font-bold text-[#2A2826] border-b border-[#C5A059]/30">소화 위산과 숙변의 유독 가스</strong>를 완전히 환수시킵니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col hover:bg-[#FDFBF7]/60 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="w-full h-64 sm:h-72 overflow-hidden bg-[#FDFBF7] relative">
                    <img 
                      src="/images/acupuncture_treatment_1779805206489.png" 
                      alt="대관절 동기침법 침술 치료" 
                      className="w-full h-full object-cover filter grayscale contrast-120 brightness-95 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-[20%] group-hover:contrast-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="py-10 px-8 sm:py-12 sm:px-10 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="relative inline-block">
                        <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2A2826] tracking-wide group-hover:text-[#C5A059] transition-colors duration-300">대관절 동기침법(고유의 침술)</h4>
                        <span className="block w-6 h-0.5 bg-[#C5A059]/40 mt-1 ml-0.5 transition-all duration-500 group-hover:w-16 group-hover:bg-[#C5A059]" />
                      </div>
                      <p className="text-xs sm:text-sm font-serif text-[#5C6351] group-hover:text-[#2A2826] transition-colors duration-300 leading-relaxed break-keep">
                        대관절 동기침법과 오장 순환 에센셜 한약 복합 침투 방식으로 <strong className="font-bold text-[#2A2826]">장부 장벽</strong>과 <strong className="font-bold text-[#C5A059] border-b border-[#C5A059]/30">심부 골반 관절의 유착</strong>을 동시 치유합니다.
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
                  <span className="text-xs font-serif text-[#C5A059] uppercase tracking-widest block font-semibold">
                    Exclusive Therapeutics
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2826] font-bold">
                    삼잘한의원만이 보유한 전례 없는 특화 치료법
                  </h3>
                  <div className="w-12 h-1 bg-[#C5A059]" />
                  
                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2A2826] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                        대관절 동기침법(고유의 침술)
                      </h4>
                      <p className="text-sm font-serif text-[#2A2826]/85 leading-relaxed pl-4">
                        단순히 피부 표토에만 자침하는 일반 침법과 달리, 몸의 중심 관절(골반, 대간, 고관절, 척추) 심부까지 침을 유도해 근육의 정렬을 맞추고 환자가 능동적으로 움직이면서 막힌 혈맥을 즉석에서 청소하는 특허 스포츠 한방 치료법입니다.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2A2826] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                        전문가 3인의 에센셜 프리미엄 수공 한약
                      </h4>
                      <p className="text-sm font-serif text-[#2A2826]/85 leading-relaxed pl-4">
                        경희대 동방의학 박사 및 패럴림픽 국가대표 주치의로 구성된 전문가 3인이 독자 배합하여 창안한 에센셜 약재입니다. 삼잘 고유의 한약(삼잘 보원탕, 삼잘 안신단, 삼잘 장청단)은 수면장애, 복부 가스 팽만, 만성 숙변 정체를 해결하기 위해 일대일로 맞춤 세정됩니다.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-lg sm:text-xl font-serif font-bold text-[#2A2826] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                        자생적 삼잘 라이프밸런스 코칭
                      </h4>
                      <p className="text-sm font-serif text-[#2A2826]/85 leading-relaxed pl-4">
                        식생 수면 습관 분석, 체질 맞춤 한방 스트레칭 교육 등을 결합하여 정밀 수면 진단 후 일상 생활에서도 질병이 회복될 수 있도록 추적 관리를 제공해 드립니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="rounded-xl overflow-hidden border border-[#DFD5C6] shadow-md">
                    <img
                      src="/images/acupuncture_treatment_1779805206489.png"
                      alt="대관절 동기침법 치료 정경"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-[#DFD5C6] shadow-md">
                    <img
                      src="/images/herbal_medicine_1779805229983.png"
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
                  <span className="text-[10px] sm:text-xs font-serif text-[#C5A059] uppercase tracking-widest font-bold block">
                    Research & Clinical Partners
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#2A2826] font-bold tracking-tight">
                    삼잘에센셜 연구 자문진 및 임상 파트너
                  </h2>
                </div>

                {/* 위아래 구분을 위한 정갈한 가로 구분선 */}
                <div className="w-full max-w-5xl mx-auto h-[1px] bg-[#DFD5C6]/50" />

                <div className="bg-transparent p-0 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-[#DFD5C6]/30 shrink-0 shadow-sm">
                    <img 
                      src="/images/herbal_medicine_1779805229983.png" 
                      alt="김유정 박사 팜힐 천연물 제형 연구소" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>



                  <div className="w-full md:w-1/2 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-serif text-[#C5A059] font-bold tracking-widest uppercase">
                          Research Partner
                        </span>
                      </div>
                      <h4 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A2826]">
                        김유정 박사
                      </h4>
                      <p className="text-base sm:text-lg font-serif text-[#C5A059] leading-relaxed italic font-medium pt-1">
                        &ldquo;약재 성분 추출 최적화와 제형 연구를 통해 처방의 생체 <br /> 이용률을 높이는 천연물 과학 전문가&rdquo;
                      </p>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-[#DFD5C6]/30">
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-[3px] w-6 h-6 rounded-full bg-[#C5A059] flex items-center justify-center shadow-md border border-white ring-2 ring-[#C5A059]/20 z-10 transition-all hover:scale-110 duration-200 text-white text-xs font-serif font-bold">
                          1
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-serif font-bold text-[#2A2826]">
                            서울대학교 대학원 이학박사 <span className="text-[#C5A059] font-normal text-xs sm:text-sm">(천연물과학 전공)</span>
                          </p>
                          <p className="text-xs sm:text-sm font-serif text-[#2A2826]/70 leading-relaxed mt-0.5">
                            천연 원료의 고농축 유효성분 추출 최적화 메커니즘과 미량 활성 원료의 생체 이용률 극대화 분야를 집중 연구하여 학위를 취득했습니다.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-10">
                        <div className="absolute left-0 top-[3px] w-6 h-6 rounded-full bg-[#C5A059] flex items-center justify-center shadow-md border border-white ring-2 ring-[#C5A059]/20 z-10 transition-all hover:scale-110 duration-200 text-white text-xs font-serif font-bold">
                          2
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-serif font-bold text-[#2A2826]">
                            팜힐 천연물 제형 연구소 소장 겸 대표
                          </p>
                          <p className="text-xs sm:text-sm font-serif text-[#2A2826]/70 leading-relaxed mt-0.5">
                            전통 한방 생약재 본연의 풍부한 약리 성분을 소실 없이 추출하고 이를 캡슐&middot;오일 등 친환경적인 고비율 고순도 액티베이팅 제형으로 가공하는 핵심 기술을 주도하고 있습니다.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-10">
                        <div className="absolute left-0 top-[3px] w-6 h-6 rounded-full bg-[#C5A059] flex items-center justify-center shadow-md border border-white ring-2 ring-[#C5A059]/20 z-10 transition-all hover:scale-110 duration-200 text-white text-xs font-serif font-bold">
                          3
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-serif font-bold text-[#2A2826]">
                            전문 아로마테라피스트 & 아로마 임상 자문
                          </p>
                          <p className="text-xs sm:text-sm font-serif text-[#2A2826]/70 leading-relaxed mt-0.5">
                            유기농 허브와 약리 휘발성 물질의 자극 신호를 임상적으로 수집하여 신경계 스트레스 완화, 가스 팽만 완화 및 면역력 조절 메커니즘을 심도 있게 접목시켰습니다.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-10">
                        <div className="absolute left-0 top-[3px] w-6 h-6 rounded-full bg-[#C5A059] flex items-center justify-center shadow-md border border-white ring-2 ring-[#C5A059]/20 z-10 transition-all hover:scale-110 duration-200 text-white text-xs font-serif font-bold">
                          4
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-serif font-bold text-[#2A2826]">
                            대표 저서: 《아로마테라피 클래스》 <span className="text-[#A67C52] text-xs font-normal border border-[#A67C52]/30 px-1.5 py-0.5 rounded bg-[#A67C52]/5">(중앙대학교 출판사)</span>
                          </p>
                          <p className="text-xs sm:text-sm font-serif text-[#2A2826]/70 leading-relaxed mt-0.5">
                            천연 아로마 및 과학적 한방 에센셜 성분을 체계와 적응증에 맞추어 현대적인 일상 가이드라인과 힐링 솔루션으로 구성한 전문 서적을 집필하였습니다.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 bg-[#FDFBF7] p-4 rounded-xl border border-[#DFD5C6]/20">
                      <p className="text-sm sm:text-base font-serif text-[#A67C52] font-semibold">
                        삼잘에센셜 처방 천연물 제형 과학 자문위원 <br /> (Natural Product Formulation Advisor)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 단축 유도 슬롯 */}
              <div className="p-8 bg-[#DFD5C6]/20 border border-[#DFD5C6] rounded-xl text-center space-y-4">
                <p className="text-lg font-serif text-[#A67C52] font-semibold">
                  &ldquo;진료받을지 고민된다면 먼저 친절히 상담해 보세요&rdquo;
                </p>
                <div className="flex justify-center flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setActiveTab("reservation");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-6 py-2.5 bg-[#C5A059] text-[#2A2826] font-serif hover:bg-[#A67C52] hover:text-white rounded-lg text-sm font-bold tracking-wider transition-all cursor-pointer"
                  >
                    온라인 예약하기 &rarr;
                  </button>
                  <a
                    href="tel:02-6952-4067"
                    className="px-6 py-2.5 bg-white border border-[#DFD5C6] font-serif text-[#2A2826]/85 hover:bg-[#FDFBF7] rounded-lg text-sm tracking-wider transition-all flex items-center justify-center cursor-pointer"
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
                <span className="text-xs font-serif text-[#C5A059] uppercase tracking-widest block font-bold">
                  National Team Doctor Activities
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2826] font-bold">
                  태극전사들이 믿고 의지한 삼잘의 치료 손길
                </h3>
              </div>
              
              {/* 대외활동 타임라인 레이아웃 (사용자 스크린샷 100% 매치) */}
              <div className="relative max-w-5xl mx-auto py-12 px-4">
                {/* 세로 중앙 관통선 (데스크톱) / 왼쪽 정렬선 (모바일) */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#DFD5C6] -translate-x-1/2 z-0" />
                
                <div className="space-y-24 relative z-10">
                  
                  {/* Row 1: 2024 파리 올림픽 (왼쪽 이미지, 오른쪽 텍스트) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
                    
                    {/* 이미지 카드 (왼쪽) */}
                    <div className="flex md:justify-end order-1 pl-12 md:pl-0 w-full">
                      <div className="w-full max-w-lg aspect-[16/10] rounded-xl overflow-hidden border border-[#DFD5C6]/60 shadow-md">
                        <img
                          src="/images/clinic_interior_1779805270752.png"
                          alt="2024 파리 올림픽 대외활동"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    
                    {/* 중앙 타임라인 도트 (절대 위치) */}
                    <div className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                      <div className="w-5 h-5 rounded-full border border-neutral-400 bg-white flex items-center justify-center shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-neutral-500" />
                      </div>
                    </div>
                    
                    {/* 텍스트 컨텐츠 (오른쪽) */}
                    <div className="space-y-2.5 order-2 pl-12 md:pl-0">
                      <h4 className="text-2xl sm:text-3xl font-serif text-[#C5A059] font-medium leading-tight">
                        2024 파리 올림픽
                      </h4>
                      <p className="text-[#7A756D] font-serif text-sm sm:text-base tracking-wide">
                        패럴림픽 국가대표팀 주치의
                      </p>
                      <p className="text-sm font-serif text-[#5C6351] leading-relaxed max-w-sm pt-2">
                        프랑스 파리 현지 국가대표 한방의학 지원단으로 임명되어 양궁, 사격 등 태극 마크 금메달 주역 종목 전담 한의약 의료팀 대표 주치의 세션을 전담해 직접 임상 진료를 펼쳤습니다.
                      </p>
                    </div>
                  </div>

                  {/* Row 2: 2020 도쿄 올림픽 (왼쪽 텍스트, 오른쪽 이미지) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative">
                    
                    {/* 텍스트 컨텐츠 (왼쪽) */}
                    <div className="space-y-2.5 order-2 md:order-1 text-left md:text-right pl-12 md:pl-0">
                      <h4 className="text-2xl sm:text-3xl font-serif text-[#C5A059] font-medium leading-tight">
                        2020 도쿄 올림픽
                      </h4>
                      <p className="text-[#7A756D] font-serif text-sm sm:text-base tracking-wide">
                        패럴림픽 국가대표팀 주치의
                      </p>
                      <p className="text-sm font-serif text-[#5C6351] leading-relaxed max-w-sm md:ml-auto pt-2">
                        조정, 육상 대한민국 대표팀 전임 전담 침치료 및 상하지 피로 부상 복구 세션을 성공적으로 수행하며 경기력 유지 및 집중 제어에 강력히 기여하였습니다.
                      </p>
                    </div>
                    
                    {/* 중앙 타임라인 도트 (절대 위치) */}
                    <div className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                      <div className="w-5 h-5 rounded-full border border-neutral-400 bg-white flex items-center justify-center shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-neutral-500" />
                      </div>
                    </div>
                    
                    {/* 이미지 카드 (오른쪽) */}
                    <div className="flex md:justify-start order-1 md:order-2 pl-12 md:pl-0 w-full">
                      <div className="w-full max-w-lg aspect-[16/10] rounded-xl overflow-hidden border border-[#DFD5C6]/60 shadow-md">
                        <img
                          src="/images/samjal_crew_1779805249409.png"
                          alt="2020 도쿄 올림픽 주치의 활동"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
