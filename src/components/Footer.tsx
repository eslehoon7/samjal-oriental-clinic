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
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t-4 border-[#0F2C59]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          
          {/* 브랜드 및 연락처 */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-2xl font-sans font-bold text-white tracking-widest">
              삼잘한의원
            </h2>
            <p className="text-xs text-slate-400 font-semibold tracking-widest uppercase">
              samjal clinic
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              과학적 분석에 설계된 치유법을 통해 몸의 복원력을 스스로 일깨워 삼잘(잘자기, 잘먹기, 잘싸기)의 정밀하고 조화로운 회복을 설계해 드립니다.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-sky-400 font-semibold">
              <span>정밀 한방 주치의 메디컬 그룹</span>
            </div>
          </div>

          {/* 지점별 사업자 정보 (Company Info) */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-base text-white font-sans tracking-wider font-semibold border-b border-slate-800 pb-2">
              지점 연혁 및 정보
            </h3>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <div>
                <span className="font-semibold text-white block">노원점 (대표 전준영)</span>
                <p>서울시 노원구 노해로 482, 7층 (덕영빌딩)</p>
                <p>일반전화: 02-6952-4067</p>
                <p>사업자번호: 210-91-87654</p>
              </div>
              <div className="pt-2 border-t border-slate-800/60">
                <span className="font-semibold text-white block">구리점 (대표 제정진)</span>
                <p>경기도 구리시 경춘로 186, 3층 (삼잘빌딩)</p>
                <p>일반전화: 031-555-3555</p>
                <p>사업자번호: 132-95-12345</p>
              </div>
            </div>
          </div>

          {/* 퀵 링크 */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-base text-white font-sans tracking-wider font-semibold border-b border-slate-800 pb-2">
              주요 서비스
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => handleQuickLink("intro")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  삼잘한의원 소개
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink("subject")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  진료과목 안내
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink("location")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  지점 운영시간 & 안내
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink("notice")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  새소식 / 공지사항
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink("reservation")}
                  className="text-sky-400 hover:underline hover:text-sky-300 transition-colors block font-semibold text-xs cursor-pointer text-left"
                >
                  삼잘 건강 AI 자가진단 실행
                </button>
              </li>
            </ul>
          </div>

          {/* 대표 문의 및 진료시간 */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-base text-white font-sans tracking-wider font-semibold border-b border-slate-800 pb-2">
              대표 상담 문의
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400" />
                <div>
                  <span className="text-xl font-bold font-sans text-white tracking-widest block">
                    031-555-3555
                  </span>
                  <span className="text-[10px] text-slate-400">구리점 상담 번호</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-400" />
                <div>
                  <span className="text-xl font-bold font-sans text-white tracking-widest block">
                    02-6952-4067
                  </span>
                  <span className="text-[10px] text-slate-400">노원점 상담 번호</span>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-left bg-slate-900/50 p-2.5 rounded border border-slate-800/40 w-full">
                  <p><span className="text-slate-200 font-sans font-medium">월·수·금:</span> 09:00 - 19:00</p>
                  <div className="flex flex-col">
                    <span><span className="text-slate-200 font-sans font-medium">화요일:</span> 09:00 - 13:00</span>
                    <span className="text-[10px] text-sky-400 mt-0.5">(점심시간 없이 논스톱 진료)</span>
                  </div>
                  <div className="flex flex-col pt-1">
                    <span><span className="text-slate-200 font-sans font-medium">토요일:</span> 09:00 - 15:00</span>
                    <span className="text-[10px] text-sky-400 mt-0.5">(점심시간 없이 논스톱 진료)</span>
                  </div>
                  <p className="pt-1"><span className="text-slate-500 font-sans">목·일요일:</span> 정기 휴진</p>
                  <p><span className="text-slate-200 font-sans">점심시간:</span> 13:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 카피라이트 및 법적 고지 */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 Samjal Clinic. All Rights Reserved. Designed for scientific & hygienic care.</p>
          <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
            <a href="#" className="hover:text-slate-300 transition-colors">이용약관</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-300 transition-colors">개인정보처리방침</a>
            <span>|</span>
            <a href="#" className="hover:text-slate-300 transition-colors">의료광고심의준수</a>
            <span>|</span>
            <a 
              href="https://firebasestorage.googleapis.com/v0/b/samjal-oriental-clinic.firebasestorage.app/o/%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD_%EB%B9%84%EA%B8%89%EC%97%AC%EA%B0%80%EA%B2%A9_%EB%85%B8%EC%9B%90.pdf?alt=media&token=5b931263-4aac-4b6a-bded-33de3ad2cd2c" 
              target="_blank" 
              rel="noopener noreferrer" 
              download="공지사항_비급여가격_노원.pdf"
              className="hover:text-slate-300 transition-colors"
            >
              비급여비용안내
            </a>
            <span>|</span>
            <button 
              onClick={() => handleQuickLink("admin")}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              관리자페이지
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
