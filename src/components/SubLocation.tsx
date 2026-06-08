import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Navigation, Sparkles, Image } from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SubLocation() {
  const [activeBranch, setActiveBranch] = useState("nowon");
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [lightboxItem, setLightboxItem] = useState<any | null>(null);

  // Firestore에서 갤러리 사진 불러오기
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const snap = await getDocs(collection(db, "galleryPhotos"));
        const list = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
        list.sort((a: any, b: any) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        setGalleryItems(list);
      } catch (err) {
        console.error("갤러리 로드 실패:", err);
      } finally {
        setGalleryLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // 현재 지점에 해당하는 사진만 필터링 (공통 포함)
  const filteredGallery = galleryItems.filter((item: any) =>
    item.branch === activeBranch || item.branch === "both"
  );

  const branches = {
    nowon: {
      name: "삼잘한의원 노원점 (대표원장 전준영)",
      address: "서울시 노원구 노해로 482, 7층 (덕영빌딩)",
      phone: "02-6952-4067",
      subway: "노원역 6번 출구 바로 앞 도보 1분 (신한은행 건물 7층)",
      hours: [
        { label: "월·화·목·금요일", val: "10:00 - 19:00" },
        { label: "수요일", val: "10:00 - 17:00" },
        { label: "토요일", val: "10:00 - 16:00", note: "점심시간 없이 논스톱 진료" },
        { label: "일요일", val: "정기 휴진" },
        { label: "점심시간", val: "13:00 - 14:00 (1시간)" }
      ],
      greeting: {
        quote: ""몸의 자생력을 일깨워 건강함을 되찾아 드립니다"",
        lines: [
          "안녕하세요, 삼잘한의원 노원점 전준영 원장입니다.",
          "경희대병원 전문의의 꼼꼼하고 수준높은 진료와 함께,",
          "삼잘한의원 고유의 기술력이 담긴 치료시스템으로 근본적인 변화를 약속드립니다."
        ]
      },
      doctor: {
        name: "전준영 원장",
        role: "삼잘한의원 노원점 대표원장",
        image: "/images/samjal_crew_professional_1780495405627.png",
        credentials: [
          "경희대 한의대 학사",
          "경희대 한의대 임상한의학 석사",
          "경희대 한방병원 인턴/레지던트 과정 수료",
          "경희대 한방병원 척추관절센터/뇌졸중센터 재직",
          "한방재활의학과 전문의",
          "한방비만학회 연구자문위원"
        ],
        research: [
          "삼잘에센셜 처방 수석 연구원(Head Developer of formulation)",
          "De-tox캡슐 수원단 연구개발",
          "Anti-inflammatory formula 프라이머 오일 연구개발",
          "관절염 솔루션: Feather-step 연구개발",
          "알레르기 솔루션: Allergy-control 연구개발",
          "불면증 솔루션: Goyo 연구개발",
          "항노화 포뮬러: Cell-renewal 연구개발"
        ],
        papers: [
          "만성 긴장성 두통에 대한 양측 완골과 풍지혈 전침 치료의 효과, 한방재활의학과학회지",
          "교통사고로 인한 편타손상의 침 치료에 대한 임상연구의 국내외 동향, 한방재활의학과학회지",
          "상지의 단일신경병증에 대한 수기치료의 국내외 동향, 한방재활의학과학회지",
          "AGREE II 를 이용한 턱관절 장애의 국내외 기개발임상진료지침의 평가, 한방재활의학과학회지",
          "근골격계 질환에서 도구를 이용한 수기요법의 연구동향 고찰, 한방재활의학과학회지"
        ]
      },
      features: [
        "체질맥진 자율신경계 디지털 정밀 분석 장비 완비",
        "집중 치유를 위한 프라이빗 개인 치료실(Sterile Room) 운영",
        "직장인을 위한 평일 야간진료 프로그램 개설",
        "최첨단 에어 샤워 및 쾌적한 전용 메디컬 라운지 구비"
      ],
      image: "/images/clinic_interior_modern_1780495390125.png"
    },
    guri: {
      name: "삼잘한의원 구리본점 (대표원장 제정진)",
      address: "경기도 구리시 경춘로 186, 3층 (삼잘빌딩)",
      phone: "031-555-3555",
      subway: "경의중앙선 구리역 1번 출구 도보 5분 현대아울렛 사거리 중앙",
      hours: [
        { label: "월·수·금요일", val: "09:00 - 19:00" },
        { label: "화요일", val: "09:00 - 13:00", note: "점심시간 없이 논스톱 진료" },
        { label: "토요일", val: "09:00 - 15:00", note: "점심시간 없이 논스톱 진료" },
        { label: "목·일요일", val: "정기 휴진" },
        { label: "점심시간", val: "13:00 - 14:00 (1시간)" }
      ],
      greeting: {
        quote: ""기본부터 탄탄하게, 여러분의 건강을 지키겠습니다"",
        lines: [
          "안녕하세요, 삼잘한의원 구리점 제정진 원장입니다.",
          "증상이라는 결과보다 그것에 이르게 된 과정에 집중해 진료하고 있습니다."
        ]
      },
      doctor: {
        name: "제정진 원장",
        role: "삼잘한의원 구리점 대표원장",
        image: "/images/samjal_crew_professional_1780495405627.png",
        credentials: [
          "경희대 한의대 학사",
          "경희대 한의대 임상한의학 박사",
          "한체대 대학원 체육학 박사",
          "경희대학교 한방병원 한방내과 레지던트 이수",
          "올림픽/아시아게임 패럴림픽 국가대표팀 주치의<br>['24파리, '22항저우, '22도쿄, '18평창, '16리우]",
          "삼잘에센셜 처방 개발 고문",
          "전)상지대 한의대 교수",
          "전)대한스포츠한의학회 회장"
        ],
        research: [
          "삼잘에센셜 처방 임상 연구 고문(Clinical Research Advisor)"
        ],
        papers: [
          "2015 한약의 도핑관리, 대한스포츠한의학회지",
          "혈부축어탕이 Adjuvant유발 관절염에 미치는 영향[dissertation], 경희대 박사학위",
          "중풍으로 인한 견비통의 초음파를 이용한 온경락요법 치료효과, 한방재활의학과학회지",
          "골다공증 검진 방법에 대한 소고, 한방재활의학과학회지",
          "용골, 모려, 구판, 별갑, 아교가 골다공증에 미치는 영향에 대한 문헌적 고찰, 한방재활의학과학회지",
          "허비증에 대한 문헌적 고찰, 한방재활의학과학회지",
          "치료용 레이저에 대한 소고, 대한한의학회지"
        ]
      },
      features: [
        "정밀 자동 추출 설비 및 원내 무독 청정 안심 탕전 시스템",
        "소아 성장 종합 정밀 진단 및 척추 관절 견인 순환 치료 베드",
        "구리점 차량 전용 자주식 파킹 서비스 완비 (무료 주차 제공)",
        "경희대 내과 전문 원장단의 오장육부 소화기 밀착 클리닉 운영"
      ],
      image: "/images/samjal_crew_professional_1780495405627.png"
    }
  };

  const current = branches[activeBranch as keyof typeof branches];

  return (
    <div className="bg-white min-h-screen animate-fadeIn">
      
      {/* 서브 메인 비주얼 배너 섹션 */}
      <div className="relative w-full h-[380px] sm:h-[480px] bg-[#0F172A] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 to-[#0F2C59]/45 mix-blend-multiply z-10" />
          <img src="/images/samjal_crew_professional_1780495405627.png" alt="지점안내 배경" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-20 text-center space-y-3 px-4 animate-fadeIn pt-16">
          <span className="text-sky-400 text-xs sm:text-sm font-sans tracking-widest uppercase font-bold flex items-center justify-center gap-1.5">Branch Locations</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans text-white font-extrabold tracking-tight">지점안내 & 오시는길</h1>
          <p className="text-slate-300 font-sans text-sm sm:text-base max-w-lg mx-auto tracking-wide leading-relaxed font-light">가장 가까운 곳에서 전하는 국가대표급 전임 원장단<br /> 정성의 수준높은 메디컬 서비스를 약속드립니다.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 지점 선택 탭 */}
        <div className="flex justify-center gap-4 mb-10 max-w-md mx-auto">
          <button onClick={() => setActiveBranch("nowon")} className={`flex-1 py-4 text-center font-sans text-base tracking-widest rounded-xl border transition-all duration-300 cursor-pointer ${activeBranch === "nowon" ? "bg-[#0F2C59] border-[#0F2C59] text-white font-bold shadow-md" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`}>노원점 (전준영 대표원장)</button>
          <button onClick={() => setActiveBranch("guri")} className={`flex-1 py-4 text-center font-sans text-base tracking-widest rounded-xl border transition-all duration-300 cursor-pointer ${activeBranch === "guri" ? "bg-[#0F2C59] border-[#0F2C59] text-white font-bold shadow-md" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`}>구리점 (제정진 대표원장)</button>
        </div>

        {/* 원장 인사말 & 학술 프로필 */}
        <div className="mb-12 relative overflow-hidden space-y-10 py-6">
          <div className="absolute top-0 right-0 w-28 h-28 bg-slate-50 rounded-bl-full pointer-events-none" />
          <div className="absolute top-0 left-0 w-28 h-28 bg-slate-50 rounded-br-full pointer-events-none" />
          <div className="flex flex-col items-center gap-5 text-center relative z-10 max-w-3xl mx-auto">
            <h3 className="text-base sm:text-lg font-sans text-[#0F2C59] font-extrabold leading-relaxed text-center">{current.greeting.quote}</h3>
            <div className="h-[1px] w-12 bg-slate-200 mx-auto" />
            <div className="space-y-2.5 text-center">
              {current.greeting.lines.map((line: string, index: number) => (
                <p key={index} className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed break-keep">{line}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4 relative z-10 max-w-5xl mx-auto w-full">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[24px] overflow-hidden select-none relative flex items-center justify-center bg-slate-50 border border-slate-200">
                <img src={current.doctor.image} alt={current.doctor.name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 lg:translate-x-3 translate-x-1 animate-fadeIn" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-8 flex flex-col justify-start text-left">
              <div className="space-y-4 lg:translate-x-3 translate-x-1">
                <div className="flex items-center gap-3.5">
                  <h4 className="text-xl sm:text-2xl font-sans font-extrabold text-[#0F172A] tracking-wide">{current.doctor.name}</h4>
                  <div className="h-[1px] w-8 bg-slate-300" />
                  <p className="text-xs sm:text-sm font-sans text-[#0F2C59] font-bold tracking-wider">{current.doctor.role}</p>
                </div>
                <ul className="space-y-2.5 text-sm sm:text-[15px] font-sans text-slate-500 leading-relaxed font-medium">
                  {current.doctor.credentials.map((cred: string, idx: number) => {
                    if (cred.includes("<br>")) {
                      return (<li key={idx} className="break-keep">{cred.split("<br>").map((line, lidx) => (<span key={lidx}>{line}{lidx < cred.split("<br>").length - 1 && <br />}</span>))}</li>);
                    }
                    return <li key={idx} className="break-keep">{cred}</li>;
                  })}
                </ul>
              </div>
              <div className="h-[1px] bg-slate-200 w-full" />
              <div className="space-y-6">
                <div className="space-y-3.5 lg:translate-x-3 translate-x-1">
                  {current.doctor.research.map((res: string, idx: number) => {
                    if (res.includes("(") && (res.includes("formulation") || res.includes("Advisor") || res.includes("Research"))) {
                      const openParenIdx = res.indexOf("(");
                      return (<div key={idx} className="text-sm sm:text-base md:text-[17px] font-sans text-[#0F172A] leading-relaxed pb-3 border-b border-slate-200 mb-3 flex flex-wrap items-baseline gap-1"><strong className="text-[#0F2C59] font-extrabold text-base sm:text-lg md:text-xl">{res.slice(0, openParenIdx).trim()}</strong><span className="text-xs sm:text-sm text-slate-400 font-sans font-medium">{res.slice(openParenIdx).trim()}</span></div>);
                    }
                    if (res.includes(":")) {
                      const [label, val] = res.split(":");
                      return (<div key={idx} className="text-sm sm:text-base md:text-[17px] font-sans text-slate-700 leading-relaxed flex items-start gap-2"><span className="text-slate-500 font-bold shrink-0">{label.trim()}:</span><span className="text-[#0F172A] font-medium">{val.trim()}</span></div>);
                    }
                    return (<div key={idx} className="text-sm sm:text-base md:text-[17px] font-sans text-slate-700 leading-relaxed font-semibold flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]/70 shrink-0" /><span>{res}</span></div>);
                  })}
                </div>
                {current.doctor.papers && current.doctor.papers.length > 0 && (
                  <div className="flex gap-4 items-stretch pt-4 lg:translate-x-3 translate-x-1">
                    <div className="w-[1.5px] bg-[#0F2C59]/40 shrink-0 self-stretch my-1" />
                    <div className="space-y-2">
                      <span className="text-xs sm:text-sm font-sans font-bold text-[#0F172A] block tracking-wide">논문</span>
                      <ul className="space-y-2.5 text-xs font-sans text-slate-400 leading-relaxed break-keep">
                        {current.doctor.papers.map((paper: string, idx: number) => (<li key={idx} className="relative pl-3.5"><span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-[#0F2C59]/70" />{paper}</li>))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 구리점 제현영 원장 */}
          {activeBranch === "guri" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-12 relative z-10 border-t border-slate-200 mt-12 animate-fadeIn max-w-5xl mx-auto w-full">
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[24px] overflow-hidden select-none relative flex items-center justify-center bg-slate-50 border border-slate-200">
                  <img src="/images/samjal_characters_expert_1780495449389.png" alt="제현영 원장" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 lg:translate-x-3 translate-x-1" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-8 flex flex-col justify-start text-left">
                <div className="space-y-4 lg:translate-x-3 translate-x-1">
                  <div className="flex items-center gap-3.5">
                    <h4 className="text-xl sm:text-2xl font-sans font-extrabold text-[#0F172A] tracking-wide">제현영 원장</h4>
                    <div className="h-[1px] w-8 bg-slate-300" />
                    <p className="text-xs sm:text-sm font-sans text-[#0F2C59] font-bold tracking-wider">삼잘한의원 구리점 원장</p>
                  </div>
                  <ul className="space-y-2.5 text-sm sm:text-[15px] font-sans text-slate-500 leading-relaxed font-medium">
                    <li className="break-keep">상지대 한의대 졸업</li>
                    <li className="break-keep">체육학 석사(한체대 대학원)</li>
                    <li className="break-keep">동수원 한방병원 인턴 과정 수료(일반수련 수료의)</li>
                    <li className="break-keep">동수원 한방병원 응급진료실 재직</li>
                    <li className="break-keep">전)한의약진흥원 연구원</li>
                  </ul>
                </div>
                <div className="h-[1px] bg-slate-200 w-full" />
                <div className="space-y-6">
                  <div className="space-y-3.5 lg:translate-x-3 translate-x-1">
                    <div className="text-sm sm:text-base md:text-[17px] font-sans text-[#0F172A] leading-relaxed pb-3 border-b border-slate-200 mb-3"><strong className="text-[#0F2C59] font-extrabold text-base sm:text-lg md:text-xl">중점진료영역</strong></div>
                    <div className="space-y-2.5">
                      {["여성질환", "다이어트", "척추/관절/통증 질환", "외상성 질환(교통사고, 스포츠)", "Foreigner Clinic"].map((item, idx) => (
                        <div key={idx} className="text-sm sm:text-base md:text-[17px] font-sans text-slate-700 leading-relaxed font-semibold flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]/70 shrink-0" /><span>{item}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 items-stretch pt-4 border-t border-slate-200 lg:translate-x-3 translate-x-1">
                    <div className="w-[1.5px] bg-[#0F2C59]/40 shrink-0 self-stretch my-1" />
                    <div className="space-y-2">
                      <span className="text-xs sm:text-sm font-sans font-bold text-[#0F172A] block tracking-wide">논문</span>
                      <ul className="space-y-2.5 text-xs font-sans text-slate-400 leading-relaxed break-keep">
                        <li className="relative pl-3.5"><span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-[#0F2C59]/70" />코어근육에 적용한 동작침법이 남자 대학 골프선수의 관절 가동성, 근 파워 및 드라이버 수행력에 미치는 급성효과, 2024</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 원내 둘러보기 갤러리 섹션 */}
        <div id="samjal-interior-tour" className="mb-16 pt-10 pb-12 border-t border-b border-slate-200/80 animate-fadeIn text-left relative overflow-hidden">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes interiorMarquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .interior-marquee-track {
              display: flex;
              width: max-content;
              animation: interiorMarquee 50s linear infinite;
            }
            .interior-marquee-track:hover { animation-play-state: paused; }
            .interior-card { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
            .interior-card:hover { transform: scale(1.06) translateY(-4px); z-index: 40 !important; }
          `}} />

          <div className="space-y-4 mb-4 px-4 sm:px-6">
            <span className="text-xs font-sans text-[#0F2C59] tracking-widest uppercase block font-bold text-center sm:text-left">Interior & Environment Tour</span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#0F172A] tracking-tight">삼잘한의원 원내 둘러보기</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed">마우스를 올리시면 가동 중인 롤링이 멈추며 한층 선명하고 크게 보실 수 있습니다.</p>
              </div>
            </div>
          </div>

          {galleryLoading ? (
            <div className="text-center py-16 text-xs text-slate-400 animate-pulse">갤러리 사진 불러오는 중...</div>
          ) : filteredGallery.length === 0 ? (
            <div className="text-center py-16 text-xs text-slate-400">
              등록된 사진이 없습니다.
            </div>
          ) : (
            <div className="relative w-full overflow-hidden py-6">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-24 bg-gradient-to-r from-white via-white/30 to-transparent z-20" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-24 bg-gradient-to-l from-white via-white/30 to-transparent z-20" />
              <div className="interior-marquee-track gap-6">
                {[...filteredGallery, ...filteredGallery].map((item: any, index: number) => (
                  <div key={`${item.firestoreId}-${index}`} onClick={() => setLightboxItem(item)} className="interior-card w-[290px] sm:w-[380px] shrink-0 bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl cursor-pointer relative group flex flex-col z-10">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-all duration-700 brightness-95 opacity-85 saturate-[0.85] group-hover:brightness-100 group-hover:opacity-100 group-hover:saturate-100" referrerPolicy="no-referrer" />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-2.5 py-1 bg-slate-950/70 backdrop-blur-md border border-white/20 text-[10px] font-sans font-bold tracking-wider text-white uppercase rounded-md">{item.tagLabel}</span>
                      </div>
                    </div>
                    <div className="p-5 text-left border-t border-slate-50 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-base sm:text-lg font-sans font-extrabold text-slate-800 tracking-tight group-hover:text-[#0F2C59] transition-colors mb-2">{item.title}</h4>
                        <p className="text-xs sm:text-sm font-sans text-slate-500 leading-relaxed font-light break-keep">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-1.5 pt-3 text-[11px] sm:text-xs font-sans text-[#0F2C59] font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity"><span>자세히 보기</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="text-center text-[11px] sm:text-xs font-sans text-slate-400 mt-2">※ 원하시는 전경을 클릭하시면 정밀 상세 확대 뷰가 제공됩니다.</p>
        </div>

        {/* 라이트박스 */}
        {lightboxItem && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn" onClick={() => setLightboxItem(null)}>
            <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full border border-slate-100 shadow-2xl animate-scaleUp text-left" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img src={lightboxItem.image} alt={lightboxItem.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button onClick={() => setLightboxItem(null)} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-slate-950/60 hover:bg-slate-950/90 hover:scale-105 border border-white/20 rounded-full text-white text-lg font-bold transition-all cursor-pointer shadow-md">✕</button>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <span className="inline-block px-2.5 py-1 bg-[#FAF9F5] text-[#0F2C59] text-xs font-sans font-extrabold tracking-wider border border-[#0F2C59]/10 uppercase rounded">{lightboxItem.tagLabel}</span>
                <h3 className="text-xl sm:text-2xl font-sans text-slate-800 font-extrabold tracking-tight">{lightboxItem.title}</h3>
                <p className="text-sm font-sans text-slate-600 leading-relaxed font-normal break-keep">{lightboxItem.desc}</p>
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button onClick={() => setLightboxItem(null)} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-sans font-bold cursor-pointer transition-all shadow-md active:scale-95">닫기</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 오시는 길 */}
        <div className="text-center pt-6 pb-14"><h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#0F172A] tracking-wide">오시는 길</h3></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-xs font-sans text-[#0F2C59] tracking-widest uppercase block font-semibold">branch information</span>
              <h3 className="text-xl sm:text-2xl font-sans text-[#0F172A] font-bold">{current.name}</h3>
            </div>
            <div className="space-y-4 border-t border-b border-slate-200 py-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-[#0F172A]">주소 및 오시는길</h4>
                  <p className="text-xs sm:text-sm font-sans text-slate-700 mt-0.5">{current.address}</p>
                  <p className="text-xs font-sans text-slate-400 mt-1 italic">{current.subway}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-sans font-bold text-[#0F172A]">진료 안내 전화</h4>
                  <p className="text-sm sm:text-base font-sans text-[#0F2C59] mt-0.5 font-bold tracking-widest">{current.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-sans font-bold text-[#0F172A] flex items-center gap-2"><Clock className="w-4 h-4 text-sky-500" />진료 시간표</h4>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 divide-y divide-slate-200/60">
                {current.hours.map((hr: any, idx: number) => (
                  <div key={idx} className="flex justify-between py-3 text-xs sm:text-sm font-sans text-slate-700 items-center">
                    <span className="font-semibold text-[#0F172A]">{hr.label}</span>
                    <div className="text-right flex flex-col items-end justify-center">
                      <span className="text-slate-500">{hr.val}</span>
                      {hr.note ? <span className="text-[10px] text-sky-500 mt-0.5 font-sans font-medium">({hr.note})</span> : <span className="text-[10px] text-transparent select-none mt-0.5">&nbsp;</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
              <img src={current.image} alt={current.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-slate-900/5 hover:bg-transparent transition-all" />
            </div>
            <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-6 text-left space-y-3">
              <h4 className="text-xs sm:text-sm font-sans font-bold text-[#0F2C59] uppercase tracking-widest">지점 진료 특장점</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-slate-600">
                {current.features.map((ft, index) => (
                  <div key={index} className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <span className="text-[#0F2C59] font-bold">✓</span>
                    <span className="leading-tight">{ft}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <a href={`tel:${current.phone}`} className="flex-1 text-center py-3.5 bg-[#0F2C59] hover:bg-indigo-900 transition-all text-white rounded-lg text-sm font-sans font-semibold tracking-wider flex items-center justify-center cursor-pointer">지점 상담전화연결</a>
              <button onClick={() => { const mapQuery = encodeURIComponent(current.address); window.open(`https://map.kakao.com/?q=${mapQuery}`, "_blank"); }} className="flex-1 text-center py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg text-sm font-sans tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Navigation className="w-4 h-4 text-slate-600" />카카오맵 길찾기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
