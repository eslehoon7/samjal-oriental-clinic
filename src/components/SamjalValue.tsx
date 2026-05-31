import { HeartPulse, CheckCircle2 } from "lucide-react";

export default function SamjalValue() {
  const values = [
    {
      title: "잘자기. 수면",
      desc: "잠은 단순한 휴식이 아닙니다. 몸이 하루의 손상을 스스로 복구하는 유일한 시간. 깊은 잠 한 번이 어떤 보약보다 낫습니다.",
      accent: "신경 안정 및 피로해소",
    },
    {
      title: "잘먹기. 식이",
      desc: "먹는 것이 곧 몸이 됩니다. 좋은 음식을 먹는 것보다 중요한 건 내 몸이 그것을 제대로 받아들이는 것. 소화가 건강의 시작입니다.",
      accent: "비위 소화력 및 식체 정화",
    },
    {
      title: "잘싸기. 배변",
      desc: "잘 내보내야 잘 채울 수 있습니다. 몸 안에 쌓인 것을 제때 비워내는 것, 그것이 독소 없는 몸의 첫걸음입니다.",
      accent: "장관 운동 및 담음 독소 정화",
    },
  ];

  return (
    <section className="py-20 bg-[#FDFBF7] border-b border-[#DFD5C6]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 상단 타이포그래피 안내 */}
        <div className="text-center space-y-3 mb-16">
          <p className="text-xs sm:text-sm font-serif text-[#C5A059] tracking-[0.3em] uppercase font-bold">
            Health Philosophy & Harmony
          </p>
          <h2 className="text-2xl sm:text-4xl font-serif text-[#2A2826] font-bold tracking-wide">
            가장 기본적이면서 가장 위대한 &apos;삼잘&apos; 원칙
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          <p className="text-sm font-serif text-[#5C6351] max-w-xl mx-auto pt-2 leading-relaxed">
            한의학은 특별한 비책이 아닙니다. 매일의 수면, 식사, 배변이 물 흐르듯 순리로워야만 온전히 건강한 육체가 비로소 시작됩니다.
          </p>
        </div>

        {/* 2컬럼 레이아웃 (왼쪽 귀여운 캐릭터 드로잉, 오른쪽 명인 텍스트 영역) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 왼쪽 삼잘 일러스트 캐릭터 뷰포트 (사용자 그림 1:1 완벽 정위 매치) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white border border-[#DFD5C6]/40 rounded-2xl shadow-md relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#C5A059]" />
            <div className="w-full max-w-[340px] aspect-square overflow-hidden rounded-xl">
              <img
                src="/images/samjal_characters_1779805299286.png"
                alt="삼잘한의원 캐릭터 일러스트"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* 하단 동글동글 명조 엠블럼 */}
            <h3 className="text-2xl font-serif font-bold text-[#A67C52] tracking-widest mt-6">
              삼잘한의원
            </h3>
            <p className="text-[#C5A059] font-serif text-xs tracking-wider uppercase mt-1">
              well sleep · well digest · well detox
            </p>
          </div>

          {/* 오른쪽 3대 철학 텍스트 상세 (사용자 그림 글자 완벽 100% 매치 및 세련 확장) */}
          <div className="lg:col-span-7 space-y-10 pl-0 lg:pl-6">
            {values.map((val, index) => (
              <div 
                key={index} 
                className="relative pl-6 sm:pl-10 space-y-2 group"
              >
                {/* 세련된 한방 자인 표식 */}
                <span className="absolute left-0 top-1 text-2xl font-serif font-semibold text-[#C5A059]/30 group-hover:text-[#C5A059] transition-colors duration-300">
                  0{index + 1}
                </span>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#2A2826] hover:text-[#C5A059] transition-colors">
                    {val.title}
                  </h4>
                  <span className="inline-flex self-start sm:self-center px-2 py-0.5 bg-[#C5A059]/10 text-[#C5A059] text-[10px] sm:text-xs font-serif rounded border border-[#C5A059]/20 uppercase font-semibold">
                    {val.accent}
                  </span>
                </div>
                
                <p className="text-[15px] sm:text-[17px] font-serif text-[#2A2826]/85 leading-relaxed tracking-wide pt-2 border-l-2 border-[#DFD5C6]/60 pl-4 group-hover:border-[#C5A059] transition-all">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
