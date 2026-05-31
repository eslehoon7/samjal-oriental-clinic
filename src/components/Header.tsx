import { Calendar, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openReservationModal: () => void;
}

export default function Header({ activeTab, setActiveTab, openReservationModal }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check in case they are already scrolled
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "intro", label: "삼잘한의원 소개" },
    { id: "subject", label: "진료과목" },
    { id: "location", label: "지점소개" },
    { id: "notice", label: "공지사항" },
  ];

  const handleMenuClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine translucent style vs overlay transparent style
  // We use transparent mode when on pages with hero backgrounds at the top,
  // and when the user hasn't scrolled more than 20px, and mobile drawer is closed.
  const isHeroTab = activeTab === "home" || activeTab === "intro" || activeTab === "subject" || activeTab === "location" || activeTab === "notice";
  const isTransparentMode = isHeroTab && !isScrolled && !isOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparentMode
        ? "bg-transparent border-b border-white/10 shadow-none text-white"
        : "bg-white/90 backdrop-blur-md border-b border-[#DFD5C6]/50 shadow-[0_2px_15px_-3px_rgba(78,58,43,0.06)] text-[#2A2826]"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isTransparentMode ? "h-24" : "h-20"}`}>
          {/* 로고 영역 */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleMenuClick("home")}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:rotate-180 ${
              isTransparentMode
                ? "bg-white/10 border-white/20"
                : "bg-[#C5A059]/10 border-[#C5A059]/30"
            }`}>
              <span className={`text-xl font-serif font-semibold transition-colors duration-300 ${isTransparentMode ? "text-white" : "text-[#C5A059]"}`}>參</span>
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl font-serif font-bold tracking-widest leading-none transition-colors duration-300 ${isTransparentMode ? "text-white" : "text-[#2A2826]"}`}>
                삼잘한의원
              </h1>
              <p className={`text-[10px] sm:text-xs font-serif tracking-wider mt-1 uppercase transition-colors duration-300 ${isTransparentMode ? "text-[#DFD5C6]/90" : "text-[#A67C52]"}`}>
                samjal oriental clinic
              </p>
            </div>
          </div>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`relative py-2 text-[15px] font-serif tracking-wider transition-colors duration-300 cursor-pointer ${
                  activeTab === item.id
                    ? isTransparentMode
                      ? "text-white font-semibold"
                      : "text-[#C5A059] font-semibold"
                    : isTransparentMode
                    ? "text-white/80 hover:text-white"
                    : "text-[#2A2826]/80 hover:text-[#C5A059]"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transition-colors duration-300 ${isTransparentMode ? "bg-white" : "bg-[#C5A059]"}`} />
                )}
              </button>
            ))}
          </nav>

          {/* 실시간 온라인 예약 버튼 */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => {
                setActiveTab("reservation");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all duration-300 text-sm font-serif tracking-wider cursor-pointer ${
                activeTab === "reservation"
                  ? "bg-[#C5A059] border-[#C5A059] text-white shadow-md font-semibold"
                  : isTransparentMode
                  ? "border-white/35 text-white hover:bg-white/10"
                  : "border-[#C5A059]/45 text-[#2A2826] hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-white"
              }`}
            >
              <Calendar className={`w-4 h-4 transition-colors duration-300 ${
                activeTab === "reservation"
                  ? "text-white"
                  : isTransparentMode
                  ? "text-white/90"
                  : "text-[#C5A059] group-hover:text-white"
              }`} />
              예약 / 자가진단
            </button>
          </div>

          {/* 모바일 메뉴 트리거 */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isTransparentMode ? "text-white hover:text-white/80" : "text-[#2A2826] hover:text-[#C5A059]"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 전체 화면 드롭다운 */}
      {isOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-t border-[#DFD5C6] px-4 pt-2 pb-6 space-y-1 shadow-inner animate-fadeIn">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-serif tracking-wider transition-colors cursor-pointer ${
                activeTab === item.id
                  ? "bg-[#C5A059]/10 text-[#C5A059] font-semibold"
                  : "text-[#2A2826]/80 hover:bg-[#DFD5C6]/20"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 px-4">
            <button
              onClick={() => {
                setActiveTab("reservation");
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#C5A059] text-white py-3 rounded-lg text-sm font-serif tracking-wider shadow animate-scaleUp cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              예약 / AI 자가진단 신청
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
