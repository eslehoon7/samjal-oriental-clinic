import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainVisual from "./components/MainVisual";
import SamjalValue from "./components/SamjalValue";
import SignatureTreatment from "./components/SignatureTreatment";
import SubIntro from "./components/SubIntro";
import SubSubject from "./components/SubSubject";
import SubLocation from "./components/SubLocation";
import SubNotice from "./components/SubNotice";
import SubReservation from "./components/SubReservation";
import { Sparkles, Calendar, SearchCheck, HeartHandshake } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [introSubTab, setIntroSubTab] = useState("philosophy");

  // 모달 예약 지원
  const openReservationModal = () => {
    setActiveTab("reservation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="samjal-app-frame" className="min-h-screen bg-[#FDFBF7] text-[#2A2826] selection:bg-[#C5A059]/30 flex flex-col justify-between">
      
      {/* 상단 통합 명가 헤더 */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openReservationModal={openReservationModal} 
      />

      {/* 본문 동적 라우팅 스폿 */}
      <main className="flex-1">
        {activeTab === "home" ? (
          <div className="animate-fadeIn">
            
            {/* 1. 홈 캐러셀 슬라이더 */}
            <MainVisual 
              setActiveTab={setActiveTab} 
              setIntroSubTab={setIntroSubTab} 
            />

            {/* 2. 삼잘 수면/식이/배변 3대 철학 스토리 (사용자 시안 정밀 매치) */}
            <SamjalValue />

            {/* 3. 명품 고유치료 3성단 카드 (사용자 시안 침/한약/의료진 매치) */}
            <SignatureTreatment 
              setActiveTab={setActiveTab} 
              setIntroSubTab={setIntroSubTab} 
            />

            {/* 4. 홈 미니 베너 (AI 삼잘 건강 분석 권유) */}
            <section className="py-16 bg-[#2A2826] text-[#DFD5C6] relative overflow-hidden border-t-2 border-b-2 border-[#C5A059]/45">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-[#C5A059] text-xs font-serif tracking-widest uppercase flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
                  Free Web Consultation
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold tracking-tight">
                  몸 속 잠든 회복 에너지를 측정해 보셨나요?
                </h3>
                <p className="text-sm font-serif text-[#A89A8D] max-w-lg mx-auto">
                  삼잘한의원이 무상 설계해 둔 AI 명의 자가 진단을 통해 <br />
                  귀하의 수면 불만족 및 속 쓰림, 장 독소를 그 자리에서 분석하고 한방 처방 레포트를 받으세요.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setActiveTab("reservation");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-8 py-3 bg-[#C5A059] hover:bg-[#A67C52] text-[#2A2826] hover:text-white transition-all duration-300 rounded-lg text-sm font-serif font-bold tracking-wider"
                  >
                    AI 삼잘 자가진단 바로받기
                  </button>
                </div>
              </div>
            </section>

          </div>
        ) : activeTab === "intro" ? (
          <SubIntro 
            subTab={introSubTab} 
            setSubTab={setIntroSubTab} 
            setActiveTab={setActiveTab} 
          />
        ) : activeTab === "subject" ? (
          <SubSubject 
            setActiveTab={setActiveTab} 
          />
        ) : activeTab === "location" ? (
          <SubLocation />
        ) : activeTab === "notice" ? (
          <SubNotice />
        ) : activeTab === "reservation" ? (
          <SubReservation />
        ) : null}
      </main>

      {/* 하단 노원/구리 지점주소 및 통합 풋터 */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
