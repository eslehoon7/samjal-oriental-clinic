import { useState, useEffect } from "react";
import { Notice } from "../types";
import { Eye, Clock, FileText, X, Sparkles } from "lucide-react";

export default function SubNotice() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch("/api/notices");
      if (!res.ok) throw new Error("공지사항 목록을 불러오지 못했습니다.");
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotices(data);
      } else {
        throw new Error("공지사항 목록 형식이 올바르지 않습니다.");
      }
    } catch (err: any) {
      setError(err.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleNoticeClick = async (notId: number) => {
    try {
      const res = await fetch(`/api/notices/${notId}`);
      if (!res.ok) throw new Error("상세 내용을 가져오지 못했습니다.");
      const detail = await res.json();
      setSelectedNotice(detail);
      // 조회수 증가 업데이트 반영
      setNotices((prev) =>
        prev.map((n) => (n.id === notId ? { ...n, views: n.views + 1 } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen animate-fadeIn">
      
      {/* 서브 메인 비주얼 배너 섹션 (Main Section) */}
      <div className="relative w-full h-[560px] sm:h-[720px] bg-[#2A2826] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A2826]/85 to-[#A67C52]/35 mix-blend-multiply z-10" />
          <img
            src="/images/herbal_medicine_1779805229983.png"
            alt="공지사항 배경"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 text-center space-y-3 px-4 animate-fadeIn">
          <span className="text-[#C5A059] text-xs sm:text-sm font-serif tracking-widest uppercase font-bold flex items-center justify-center gap-1.5">
            Samjal Notice Desk
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-extrabold tracking-tight">
            알림마당 / 공지사항
          </h1>
          <p className="text-[#DFD5C6] font-serif text-sm sm:text-base max-w-lg mx-auto tracking-wide leading-relaxed font-light">
            삼잘한의원의 진료 일정 변경, 하절기 휴진 및 건강 동향<br /> 한방 칼럼 소식입니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* 로딩 장벽 */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-serif text-[#2A2826]/80">소식을 정성스럽게 서적에서 찾아내는 중입니다...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white border border-[#DFD5C6]/40 rounded-xl max-w-lg mx-auto p-8">
            <p className="text-sm font-serif text-red-600 font-bold mb-4">{error}</p>
            <button
              onClick={fetchNotices}
              className="px-4 py-2 bg-[#C5A059] rounded-lg text-xs font-serif text-[#2A2826] font-bold cursor-pointer"
            >
              다시 가져오기
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto overflow-hidden">
            
            {/* 가로 기와풍 테이블 헤더 */}
            <div className="hidden sm:grid grid-cols-12 bg-[#2A2826] text-[#DFD5C6] px-6 py-4 text-xs font-serif uppercase tracking-widest font-bold">
              <span className="col-span-1 text-center">번호</span>
              <span className="col-span-7 pl-4">제목</span>
              <span className="col-span-2 text-center">등록일</span>
              <span className="col-span-2 text-center">조회수</span>
            </div>

            {/* 리스트 아이템목록 */}
            <div className="divide-y divide-[#DFD5C6]/40">
              {(notices || []).map((n, idx) => (
                <div
                  key={n.id}
                  onClick={() => handleNoticeClick(n.id)}
                  className="grid grid-cols-1 sm:grid-cols-12 px-6 py-5 sm:py-6 text-stone-800 hover:bg-[#FDFBF7]/80 transition-colors duration-300 items-center cursor-pointer group"
                >
                  <span className="col-span-1 text-center hidden sm:block font-serif text-sm text-[#5C6351]">
                     {n.id}
                  </span>
                  
                  {/* 모바일 최적화 타이틀 */}
                  <div className="col-span-1 sm:col-span-7 pl-0 sm:pl-4 space-y-1.5 flex flex-col items-start">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <FileText className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <h3 className="text-sm sm:text-base font-serif font-bold text-[#2A2826] group-hover:text-[#C5A059] transition-all text-left">
                        {n.title}
                      </h3>
                      {idx === 0 && (
                        <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-600 text-[9px] font-bold rounded">
                          N
                        </span>
                      )}
                    </div>
                    {/* 모바일 서브 가이드 정보 */}
                    <div className="flex sm:hidden items-center gap-3 text-[11px] text-[#5C6351]">
                      <span>{n.date}</span>
                      <span>&bull;</span>
                      <span>조회수 {n.views}</span>
                    </div>
                  </div>

                  <span className="col-span-2 text-center hidden sm:block font-serif text-xs text-[#5C6351]">
                    {n.date}
                  </span>
                  <span className="col-span-2 text-center hidden sm:block font-serif text-xs text-[#5C6351] group-hover:text-stone-900">
                    {n.views}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 상세 팝업 모달 */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#FDFBF7] border border-[#C5A059]/30 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden animate-scaleUp">
              
              {/* 모달 헤더 */}
              <div className="bg-[#2A2826] text-[#DFD5C6] px-6 py-5 flex justify-between items-center border-b border-[#C5A059]/45">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm tracking-wider font-serif">삼잘한의원 공식 서신 공고</span>
                </div>
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="p-1 rounded-full text-[#DFD5C6] hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 모달 본문 */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-3 pb-4 border-b border-[#DFD5C6]/50">
                  <h3 className="text-xl sm:text-2xl font-serif text-[#2A2826] font-bold text-left leading-relaxed">
                    {selectedNotice.title}
                  </h3>
                  <div className="flex justify-between items-center text-xs text-[#5C6351]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      등록일: {selectedNotice.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      조회수: {selectedNotice.views}
                    </span>
                  </div>
                </div>

                <div className="text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-left whitespace-pre-wrap max-h-[300px] overflow-y-auto pr-2">
                  {selectedNotice.content}
                </div>
              </div>

              {/* 모달 풋버튼 */}
              <div className="bg-[#DFD5C6]/20 px-6 py-4 flex justify-end border-t border-[#DFD5C6]/40">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-6 py-2 bg-[#2A2826] text-[#DFD5C6] hover:bg-[#C5A059] hover:text-[#2A2826] text-xs font-serif tracking-wider rounded-lg transition-colors duration-300 cursor-pointer"
                >
                  서신 닫기
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
