import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// 임시 인메모리 예약 저장소 (관리용 데모)
interface Reservation {
  id: string;
  name: string;
  phone: string;
  branch: string;
  subject: string;
  date: string;
  time: string;
  memo: string;
  createdAt: string;
}

const reservations: Reservation[] = [
  {
    id: "1",
    name: "홍길동",
    phone: "010-1234-5678",
    branch: "노원점",
    subject: "통증/관절/척추질환",
    date: "2026-06-01",
    time: "14:00",
    memo: "만성 요통이 있어서 치료받고 싶습니다.",
    createdAt: new Date().toISOString()
  }
];

// 임시 공지사항 데이터
interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  views: number;
}

const notices: Notice[] = [
  {
    id: 1,
    title: "삼잘한의원 공식 홈페이지 그랜드 오픈 안내",
    content: "전통 한방 마인드와 최신 의학지식의 조화를 추구하는 삼잘한의원의 공식 홈페이지가 오픈했습니다. 노원점과 구리점에서 따뜻한 마음으로 고객님을 모시겠습니다.",
    date: "2026-05-20",
    views: 112
  },
  {
    id: 2,
    title: "[공통] 하절기 수면/위장 장애 다스리기 한방 강좌",
    content: "삼잘의 기본인 '잘자기'와 '잘먹기'를 지키는 방법을 안내해 드립니다. 무더위 속 무너지는 수면 패턴과 위장 운동력을 회복하는 수칙을 원장님들께서 정성스럽게 알려드립니다.",
    date: "2026-05-25",
    views: 48
  },
  {
    id: 3,
    title: "국가대표 패럴림픽 주치의 전준영/제정진 원장 초빙 진료일정 안내",
    content: "국가대표 선수들의 관절 및 신경 회복 관리를 진두지휘하신 원장님들의 정밀 '대관절 동기침법' 클리닉 일정입니다. 조기 예약이 필수이오니 많은 관심 부탁드립니다.",
    date: "2026-05-26",
    views: 31
  }
];

// 1. 예약 API 엔드포인트
app.post("/api/reservations", (req, res) => {
  const { name, phone, branch, subject, date, time, memo } = req.body;
  if (!name || !phone || !branch || !subject || !date || !time) {
    return res.status(400).json({ error: "필수 예약 항목이 누락되었습니다." });
  }

  const newReservation: Reservation = {
    id: String(reservations.length + 1),
    name,
    phone,
    branch,
    subject,
    date,
    time,
    memo: memo || "",
    createdAt: new Date().toISOString()
  };

  reservations.push(newReservation);
  res.status(201).json({ success: true, reservation: newReservation });
});

app.get("/api/reservations", (req, res) => {
  res.json(reservations);
});

// 2. 공지사항 API 엔드포인트
app.get("/api/notices", (req, res) => {
  res.json(notices);
});

app.get("/api/notices/:id", (req, res) => {
  const notice = notices.find(n => n.id === Number(req.params.id));
  if (!notice) return res.status(404).json({ error: "공지사항을 찾을 수 없습니다." });
  notice.views += 1;
  res.json(notice);
});

// 3. AI 삼잘 자가 건강 진단 API 엔드포인트
app.post("/api/diagnose", async (req, res) => {
  const { sleep, eat, poop, age, gender, symptoms } = req.body;

  if (!sleep || !eat || !poop) {
    return res.status(400).json({ error: "수면, 식이, 배변 상태 조건이 필요합니다." });
  }

  const prompt = `
  [한의학 건강 분석 요청]
  환자 기본 정보: 나이 ${age || "미기재"}, 성별 ${gender || "미기재"}
  주요 불편 증상: ${symptoms || "특이사항 없음"}

  '삼잘(三잘)' 지표 상태:
  1. 잘자기 (수면 상태): ${sleep}
  2. 잘먹기 (식이 및 소화 상태): ${eat}
  3. 잘싸기 (배변 상태): ${poop}

  위 지표들을 바탕으로, 따뜻하고 품격 있으며 대단히 전문적인 한국 전통 명품 한의사의 톤(하오체 또는 존댓말)으로 정밀 건강 분석 보고서를 작성해 주세요. 
  
  [리포트 포함 내용]
  1. **총평 (삼잘 균형 진단)**: 세 가지 지표의 전반적인 불균형 상황과 몸 속 기혈(氣血)의 균형 실태 분석.
  2. **개별 한방 분석 및 처방적 조언**:
     - 수면(잘자기) 조언 및 유익한 꿀팁 (예: 마그네슘, 산조인 차, 지압점 등 연계)
     - 식이(잘먹기) 조언 및 추천 약선 음식 (예: 생강, 인삼, 무 등의 한방 성질 추천)
     - 배변(잘싸기) 흐름 교정 조언 (기운의 순환, 대장 열독 등)
  3. **삼잘한의원 고유의 치료 솔루션 매칭**:
    - "심부근육 활성을 높이는 대관절 동기침법"이나 "전문가 3인의 프리미엄 에센셜 한약(삼잘 보원탕, 삼잘 안신단 등)"의 효능을 설명하며 직접 내원 시 치료 가능한 정밀 케어 로드맵 제시.

  *답변 포맷은 정갈하고 세련되게 마크다운(Markdown) 형태로 가독성 있게 구분해 주세요. 친장하고 품격 높은 어조로 가슴에 와닿는 조언을 부탁드립니다.
  `;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // API Key가 유효하지 않을 때의 우아한 Fallback 데이터 생성
      const mockAnalysis = `### [삼잘한의원 정밀 한방 삼잘(三잘) 진단 보고서]

귀하의 건강 상태를 동양의학의 세 가지 근본 축인 **'잘자기(수면)', '잘먹기(식이)', '잘싸기(배변)'**의 관점으로 세심히 분석하고 가상 리포트를 제공해드립니다.

---

#### 1. 대강(大綱) - 삼잘 균형 총평
현재 귀하의 삼잘 점수는 **균형을 찾아가는 과도기 현상**에 있습니다. 수면이 불완전하거나 소화 능력이 정체되면, 비위(脾胃)의 기운이 온전치 못해 순환계 전체에 열독이 쌓일 수 있습니다. 머리는 맑고 시원해야 하며, 장은 따뜻하고 부드럽게 돌아가야 하는 **'수승화강(水昇火降)'**의 섭리가 일시적으로 어긋난 상태일 수 있습니다. 

---

#### 2. 각론(各論) - 지표별 처방적 제언

*   **잘자기(수면) - ${sleep}**:
    *   **한의학적 소견**: 신장의 기운이 부족하고 심장에 열이 떠 있는 '심신불교(心腎不交)' 상태가 의심됩니다.
    *   **천연 처방**: 대추차(산조인)를 잠들기 1시간 전에 미지근하게 음용하시면 신체 신경을 차분히 한방 안정시킵니다.
*   **잘먹기(식이/소화) - ${eat}**:
    *   **한의학적 소견**: 중초(뱃속)의 소화 흡수를 맡는 비위의 기능이 둔화되어 '식적(食積)'이 쌓이고 상부로 가스가 치밀 수 있습니다.
    *   **천연 처방**: 따뜻한 생강차 또는 소화를 돕는 볶은 보리차가 비위의 습기를 날려 원활한 소화에 큰 보탬이 됩니다.
*   **잘싸기(배변) - ${poop}**:
    *   **한의학적 소견**: 하초(아랫배)에 음액이 부족하거나 대장에 담음(痰飮) 정체로 화(火)가 머물러 기 순환이 막히는 증상입니다.
    *   **천연 처방**: 검은콩과 풍부한 나물죽 등으로 아랫배를 보하고 장 전반의 운동을 보조해주십시오.

---

#### 3. 삼잘한의원 명품 특화 한방 솔루션
*   **심부근육 활성을 높이는 대관절 동기침법**: 내부 장기 순환을 다스리는 수족의 한방 경혈을 지압 및 자침함으로써 허리와 장부의 꼬인 기운을 그 자리에서 풀어냅니다.
*   **전문가 3인의 삼잘 에센셜 프리미엄 한약**: 고질적인 수면 문제와 위열(胃熱), 변비 독소를 청소하기 위해 엄선된 최고급 청정 청수 한약재로 조제합니다.

> **원장실 훈화**:  
> *"건강은 거창한 비법에 있지 않고 매일 잘 자고 잘 먹고 부드럽게 비워내는 '자연의 숨결'에 있습니다. 조속히 내원하셔서 더 깊이 있는 정밀 진맥을 받아보시기를 권합니다."*`;

      return res.json({ analysis: mockAnalysis, isDemo: true });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7
      }
    });

    res.json({ analysis: response.text || "해결책을 분석해내지 못하였습니다. 잠시 후 감사하겠습니다.", isDemo: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "자가진단을 수행하는 동안 시스템 요류가 발생했습니다.", details: error.message });
  }
});

// Vite 및 정적 리소스 브릿지
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Samjal Clinic Oriental Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
