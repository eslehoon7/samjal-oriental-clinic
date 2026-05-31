import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface SubSubjectProps {
  setActiveTab: (tab: string) => void;
}

export default function SubSubject({ setActiveTab }: SubSubjectProps) {
  const [activeSubTab, setActiveSubTab] = useState("spine");

  const subTabs = [
    { id: "spine", label: "통증/관절/척추질환" },
    { id: "internal", label: "내과질환" },
    { id: "allergy", label: "알레르기" },
    { id: "cancer", label: "통합암관리" },
    { id: "detox", label: "항노화/해독" },
  ];

  const contents = {
    spine: {
      title: "통증 & 관절 & 척추 맞춤 회복 클리닉",
      subtitle: "골반 관절 및 비대칭의 즉각적 교정",
      desc: "삼잘한의원의 대표 시그니처 요법인 '대관절 동기침법'을 접목하여 협착증, 만성 디스크, 좌골신경통, 오십견, 퇴행성 관절염 등 깊숙하고 둔택한 고관절 통증을 직접 치료합니다.",
      benefits: [
        "대관절 동기침법을 통한 관절 깊숙한 유착 해제 및 자가 가동범위 확대",
        "국가대표 선수들이 전수받은 침치료 기법으로 빠른 근섬유 부종 해소",
        "수승화강 요법을 결합하여 염증 독기로 타오르는 관절 열 증세 신속 진정",
        "삼잘 보원탕을 통한 등뼈 주위 기혈 강화 및 골감소 회복"
      ],
      image: "/images/acupuncture_treatment_1779805206489.png"
    },
    internal: {
      title: "비위(脾胃) 및 만성 장내과 클리닉",
      subtitle: "잘 먹고, 잘 통하는 행복한 소화기",
      desc: "복부 불쾌감, 위경련, 상부 역류성 식도염, 설사 및 지독한 장 정체를 전통 상한설(傷寒說) 기초와 맥진을 통해 심층 치료합니다. 비위의 차가운 냉기를 몰아내 소화 화력을 증폭시킵니다.",
      benefits: [
        "삼잘 보원의 보위 탕약 조제로 위 벽 점막 세포의 탄탄한 자가 복구 보조",
        "복부 가스가 소통되고 단전을 덥혀주는 한방 뜸/침맥 온열 관리 시스템",
        "체질 맞춤 식이 가이드북 제공으로 매일의 잘먹는 패턴 완비",
        "독소 역류로 인한 두통, 만성 피로의 연대 고리 원인 차단"
      ],
      image: "/images/herbal_medicine_1779805229983.png"
    },
    allergy: {
      title: "알레르기 & 면역 회복 클리닉",
      subtitle: "무너진 면역 장벽의 자생 강화",
      desc: "만성 비염, 아토피, 알레르기 두드러기, 천식 등은 체내 면역 단절이 한계치에 다다랐을 때 표출됩니다. 장 장벽의 가래 독소(담음)를 정화하여 과민 반응하지 않는 굳건한 림프 순환을 확립시킵니다.",
      benefits: [
        "장청 해독 탕약 조제로 장 누수 증상 and 혈액 내 독성 피로 물질 즉각 정화",
        "한방 혈위 자궁 면역 약침 자침으로 피부 및 비강 장벽의 붓기 제어",
        "수면 질 향상(잘자기) 처방을 통하여 자율신경계 밤샘 복원력 부양",
        "체질 침 치료를 통한 만성적인 한열 편중 체질성 불균형 극복"
      ],
      image: "/images/clinic_interior_1779805270752.png"
    },
    cancer: {
      title: "한양방 통합 암 요관리 클리닉",
      subtitle: "항암 부작용 완화 및 종양 미세환경 정화",
      desc: "암 치료 과정에서 극심한 오심, 구토, 불면, 식욕부진, 기력 저하를 겪는 환우님들을 위해 체계적인 면역 보양 치료를 제공합니다. 대학병원 항암 스케줄을 무사히 이수하도록 신체 자생력을 높여 줍니다.",
      benefits: [
        "위암, 대장암, 자궁암 및 유방암 등 암종별 최적의 한방 기력 배가 처방",
        "면역 세포 활력을 직접 증강시키는 고농축 진세노사이드 삼잘 산삼 약침 요법",
        "심신의 긴장감을 풀고 뇌를 안정시켜 아늑한 잠에 들도록 유도하는 삼잘 안신단",
        "임상 암 정보 빅데이터에 근거한 안전하고 교차 검증된 약재 선정 법칙"
      ],
      image: "/images/samjal_crew_1779805249409.png"
    },
    detox: {
      title: "전통 항노화 & 체내 해독 클리닉",
      subtitle: "맑은 피와 젊고 활기찬 신체 리듬 회복",
      desc: "체내에 정체된 만성 염증, 중금속, 대사 장벽 찌꺼기를 세정하여 세포 수준의 미토콘드리아 전위 회복을 완성시킵니다. 신진대사의 화력을 불태우고 젊은 피부와 가벼운 기상을 부양합니다.",
      benefits: [
        "삼잘 장청 한방 배독 관장 및 전신 혈맥 기혈 사혈 사독 시스템",
        "위장의 식적 독소 및 복부 비만 숙변 가스 일주일 단기 고속 청소",
        "경희대 연구진들의 체계적인 한방 기명 안티에이징 공진 보환 처방",
        "몸을 차갑고 정적으로 가두는 활성 젖산 제거 스트레칭 전수 조치"
      ],
      image: "/images/herbal_medicine_1779805229983.png"
    }
  };

  const current = contents[activeSubTab as keyof typeof contents];

  return (
    <div className="bg-[#FDFBF7] min-h-screen animate-fadeIn">
      
      {/* 서브 메인 비주얼 배너 섹션 (Main Section) */}
      <div className="relative w-full h-[560px] sm:h-[720px] bg-[#2A2826] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A2826]/85 to-[#A67C52]/35 mix-blend-multiply z-10" />
          <img
            src="/images/acupuncture_treatment_1779805206489.png"
            alt="진료과목 배경"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 text-center space-y-3 px-4 animate-fadeIn">
          <span className="text-[#C5A059] text-xs sm:text-sm font-serif tracking-widest uppercase font-bold flex items-center justify-center gap-1.5">
            Specialized Medical Departments
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-extrabold tracking-tight">
            정밀 진료과목
          </h1>
          <p className="text-[#DFD5C6] font-serif text-sm sm:text-base max-w-lg mx-auto tracking-wide leading-relaxed font-light">
            근본적 자생 능력 회복을 목표로 하는 <br /> 삼잘의 검증된 특수 의료진과 수공치료를 경험하십시오.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 탭 네비게이션 */}
        <div className="flex justify-center border-b border-[#DFD5C6]/40 mb-16 max-w-2xl mx-auto">
          <div className="grid grid-cols-5 w-full">
            {subTabs.map((ts) => (
              <button
                key={ts.id}
                onClick={() => setActiveSubTab(ts.id)}
                className={`py-3 text-center text-[11px] sm:text-sm font-serif tracking-wider transition-all duration-300 border-b-2 cursor-pointer ${
                  activeSubTab === ts.id
                    ? "border-[#CEAD6F] text-[#CEAD6F] font-bold"
                    : "border-transparent text-[#2A2826]/70 hover:text-[#CEAD6F]"
                }`}
              >
                {ts.label}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 내용 분할 슬롯 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* 왼쪽 텍스트 정보 */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-serif text-[#C5A059] uppercase tracking-wider block font-semibold">
                  {current.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#2A2826] font-bold leading-tight">
                  {current.title}
                </h3>
              </div>
              <div className="w-12 h-1 bg-[#C5A059]" />
              <p className="text-sm sm:text-base font-serif text-[#2A2826]/85 leading-relaxed">
                {current.desc}
              </p>

              <div className="space-y-3 pt-4 border-t border-[#DFD5C6]/30">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#2A2826] font-serif">
                  주요 핵심 치료 혜택
                </h4>
                <ul className="space-y-2.5">
                  {current.benefits.map((bf, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-serif text-[#5C6351]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 mt-2" />
                      <span className="leading-relaxed">{bf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 바로 예약 하러가기 단축 행동 버튼 */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveTab("reservation");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2826] hover:bg-[#C5A059] text-white hover:text-[#2A2826] transition-all duration-300 rounded-lg text-sm font-serif tracking-wider cursor-pointer font-semibold shadow-sm"
              >
                <span>이 진료과목 온라인 예약/AI진단 상담</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 오른쪽 시각적 고품질 생성 이미지 결합부 (리퍼러 정책 준수) */}
          <div className="lg:col-span-5 min-h-[300px] rounded-xl overflow-hidden border border-[#DFD5C6] shadow-inner relative flex flex-col">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover flex-1"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
              <p className="text-[#DFD5C6] text-xs font-serif">Samjal Special Recovery Focus Care</p>
              <h4 className="text-white text-base font-serif font-bold">전통 침뜸약선 융합기술</h4>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
