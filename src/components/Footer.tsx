import { Phone, Clock, MapPin, ShieldAlert, Heart } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleQuickLink = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2A2826] text-[#DFD5C6] pt-16 pb-12 border-t-4 border-[#C5A059]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#4E3A2B] pb-12">
          
          {/* 브랜드 및 연락처 */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white tracking-widest">
              삼잘한의원
            </h2>
            <p className="text-xs text-[#A67C52] tracking-wider uppercase">
              oriental medicine hospital
            </p>
            <p className="text-sm text-[#A89A8D] leading-relaxed">
              자연의 섭리에 따라 몸의 치유력을 스스로 일깨워 삼잘(잘자기, 잘먹기, 잘싸기)의 조화로운 회복을 설계해 드립니다.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A059]">
              <Heart className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
              <span>동양 정통 의료 주치의 그룹</span>
            </div>
          </div>

          {/* 지점별 사업자 정보 (Company Info) */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-base text-white font-serif tracking-wider font-semibold border-b border-[#4E3A2B] pb-2">
              지점 연혁 및 정보
            </h3>
            <div className="space-y-3 text-xs text-[#A89A8D] leading-relaxed">
              <div>
                <span className="font-semibold text-white block">노원점 (대표 전준영)</span>
                <p>서울시 노원구 노해로 482, 7층 (덕영빌딩)</p>
                <p>일반전화: 02-6952-4067</p>
                <p>사업자번호: 210-91-87654</p>
              </div>
              <div className="pt-2 border-t border-[#4E3A2B]/40">
                <span className="font-semibold text-white block">구리점 (대표 제정진)</span>
                <p>경기도 구리시 경춘로 186, 3층 (삼잘빌딩)</p>
                <p>일반전화: 031-555-3555</p>
                <p>사업자번호: 132-95-12345</p>
              </div>
            </div>
          </div>

          {/* 퀵 링크 */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-base text-white font-serif tracking-wider font-semibold border-b border-[#4E3A2B] pb-2">
              주요 서비스
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleQuickLink("intro")}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  삼잘한의원 소개
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink("subject")}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  진료과목 안내
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink("location")}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  지점 운영시간 & 안내
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink("notice")}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  새소식 / 공지사항
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink("reservation")}
                  className="text-[#C5A059] hover:underline transition-colors block font-semibold text-xs cursor-pointer"
                >
                  삼잘 건강 AI 자가진단 실행
                </button>
              </li>
            </ul>
          </div>

          {/* 대표 문의 및 진료시간 */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-base text-white font-serif tracking-wider font-semibold border-b border-[#4E3A2B] pb-2">
              대표 상담 문의
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <span className="text-xl font-bold font-serif text-white tracking-widest block">
                    031-555-3555
                  </span>
                  <span className="text-[10px] text-[#A67C52]">구리본점 및 대표접수</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <span className="text-xl font-bold font-serif text-white tracking-widest block">
                    02-6952-4067
                  </span>
                  <span className="text-[10px] text-[#A67C52]">노원점 상담 번호</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#A89A8D] pt-2 border-t border-[#4E3A2B]/40">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1 text-left">
                  <p><span className="text-white font-serif">월·수·금요일:</span> 09:00 - 19:00</p>
                  <div className="flex flex-col">
                    <span><span className="text-white font-serif">화요일:</span> 09:00 - 13:00</span>
                    <span className="text-[10px] text-[#C5A059] mt-0.5">(점심시간 없이 논스톱 진료)</span>
                  </div>
                  <div className="flex flex-col">
                    <span><span className="text-white font-serif">토요일:</span> 09:00 - 15:00</span>
                    <span className="text-[10px] text-[#C5A059] mt-0.5">(점심시간 없이 논스톱 진료)</span>
                  </div>
                  <p><span className="text-[#C5A059] font-serif">목·일요일:</span> 정기 휴진</p>
                  <p><span className="text-white font-serif">점심시간:</span> 13:00 - 14:00 (1시간)</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 카피라이트 및 법적 고지 */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#7C6E61] gap-4">
          <p>© 2026 Samjal Oriental Clinic. All Rights Reserved. Designed for premium oriental care.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#A89A8D] transition-colors">이용약관</a>
            <span>|</span>
            <a href="#" className="hover:text-[#A89A8D] transition-colors">개인정보처리방침</a>
            <span>|</span>
            <a href="#" className="hover:text-[#A89A8D] transition-colors">의료광고심의준수</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
