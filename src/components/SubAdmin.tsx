import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { 
  Trash2, Megaphone, CheckCircle, Image, Send, Check,
  Activity, ChevronDown, ChevronUp, User, Sparkles, Pencil, X, Plus, Upload
} from "lucide-react";
import { Notice, DiagnoseItem } from "../types";
import { db, storage } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default function SubAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeSubTab, setActiveSubTab] = useState<"notices" | "photos" | "diagnoses">("notices");
  
  // States
  const [notices, setNotices] = useState<Notice[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [diagnoses, setDiagnoses] = useState<DiagnoseItem[]>([]);
  
  const [noticeLoading, setNoticeLoading] = useState(false);
  const [diagLoading, setDiagLoading] = useState(false);
  const [expandedDiag, setExpandedDiag] = useState<Record<string, boolean>>({});
  
  // Notices Form
  const [newNotice, setNewNotice] = useState({ title: "", content: "", isPinned: false });
  const [noticeMessage, setNoticeMessage] = useState("");
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);

  // Photos Edit Form
  const [editingPhoto, setEditingPhoto] = useState<any | null>(null);
  const [photoEditTitle, setPhotoEditTitle] = useState("");
  const [photoEditDesc, setPhotoEditDesc] = useState("");

  // Photos Add Form — Firebase Storage 기반으로 변경
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoDesc, setNewPhotoDesc] = useState("");
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);       // ← File 객체로 변경
  const [newPhotoPreview, setNewPhotoPreview] = useState("");                // ← 미리보기용 별도 state
  const [newPhotoTagLabel, setNewPhotoTagLabel] = useState("원내 인증 전경");
  const [photoAddError, setPhotoAddError] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);              // ← 업로드 중 상태 추가

  // 자가진단 기록 수동 추가 States
  const [isAddingDiagnose, setIsAddingDiagnose] = useState(false);
  const [addDiagAge, setAddDiagAge] = useState("40대");
  const [addDiagGender, setAddDiagGender] = useState("여성");
  const [addDiagSleep, setAddDiagSleep] = useState("자다가 자주 깸");
  const [addDiagEat, setAddDiagEat] = useState("가스가 차고 소화가 느림");
  const [addDiagPoop, setAddDiagPoop] = useState("시원치 못하고 잔변감 있음");
  const [addDiagSymptoms, setAddDiagSymptoms] = useState("피로 누적으로 어깨가 뻐근하고 머리가 무거우며 숙면이 어렵습니다.");
  const [addDiagDoctorNotes, setAddDiagDoctorNotes] = useState("");
  const [addDiagError, setAddDiagError] = useState("");
  const [addDiagLoading, setAddDiagLoading] = useState(false);

  // 자가진단 기록 개별 수정 States
  const [editingDiag, setEditingDiag] = useState<DiagnoseItem | null>(null);
  const [editDiagAge, setEditDiagAge] = useState("");
  const [editDiagGender, setEditDiagGender] = useState("");
  const [editDiagSleep, setEditDiagSleep] = useState("");
  const [editDiagEat, setEditDiagEat] = useState("");
  const [editDiagPoop, setEditDiagPoop] = useState("");
  const [editDiagSymptoms, setEditDiagSymptoms] = useState("");
  const [editDiagAnalysis, setEditDiagAnalysis] = useState("");
  const [editDiagDoctorNotes, setEditDiagDoctorNotes] = useState("");
  const [editDiagLoading, setEditDiagLoading] = useState(false);
  const [editDiagError, setEditDiagError] = useState("");

  // Doctor Notes State
  const [tempNotes, setTempNotes] = useState<Record<string, string>>({});
  const [saveNotesStatus, setSaveNotesStatus] = useState<Record<string, string>>({});

  const handleSaveNotes = async (id: string, notes: string) => {
    try {
      setSaveNotesStatus(prev => ({ ...prev, [id]: "저장 중..." }));
      
      try {
        const snapshot = await getDocs(collection(db, "diagnoses"));
        const targetDoc = snapshot.docs.find(d => d.id === id || String(d.data().id) === id);
        if (targetDoc) {
          await updateDoc(doc(db, "diagnoses", targetDoc.id), { doctorNotes: notes });
        }
      } catch (fErr) {
        console.warn("Firestore update issue, continuing via Express API:", fErr);
      }

      const response = await fetch(`/api/diagnoses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorNotes: notes })
      });
      if (response.ok) {
        setDiagnoses(prev => prev.map(item => item.id === id ? { ...item, doctorNotes: notes } : item));
        setSaveNotesStatus(prev => ({ ...prev, [id]: "소견이 성공적으로 귀속되었습니다!" }));
        setTimeout(() => {
          setSaveNotesStatus(prev => ({ ...prev, [id]: "" }));
        }, 3000);
      } else {
        setSaveNotesStatus(prev => ({ ...prev, [id]: "저장 실패" }));
      }
    } catch (err) {
      console.error(err);
      setSaveNotesStatus(prev => ({ ...prev, [id]: "오류 발생" }));
    }
  };

  // ──────────────────────────────────────────────
  // 사진 목록 Firestore에서 불러오기
  // ──────────────────────────────────────────────
  const loadPhotos = async () => {
    try {
      const snap = await getDocs(collection(db, "galleryPhotos"));
      const list = snap.docs.map(d => ({ firestoreId: d.id, ...d.data() }));
      // 최신순 정렬
      list.sort((a: any, b: any) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      setPhotos(list);
    } catch (err) {
      console.error("갤러리 사진 로드 실패:", err);
    }
  };

  // Load Data
  const loadAllData = async () => {
    setNoticeLoading(true);
    setDiagLoading(true);
    try {
      const fsNoticesPromise = getDocs(collection(db, "notices")).catch(fErr => {
        console.warn("Firestore notices fetch failed:", fErr);
        return null;
      });
      const expressNoticesPromise = fetch("/api/notices").then(r => r.ok ? r.json() : []).catch(err => {
        console.warn("Express API notices fetch failed:", err);
        return [];
      });
      const fsDiagsPromise = getDocs(collection(db, "diagnoses")).catch(fErr => {
        console.warn("Firestore diagnoses fetch failed:", fErr);
        return null;
      });
      const expressDiagsPromise = fetch("/api/diagnoses").then(r => r.ok ? r.json() : []).catch(err => {
        console.warn("Express API diagnoses fetch failed:", err);
        return [];
      });

      const [fsNoticesSnap, apiNotices, fsDiagsSnap, apiDiags] = await Promise.all([
        fsNoticesPromise,
        expressNoticesPromise,
        fsDiagsPromise,
        expressDiagsPromise
      ]);

      // Notices
      let noticesList: Notice[] = [];
      if (fsNoticesSnap) {
        noticesList = fsNoticesSnap.docs.map((d) => {
          const data = d.data();
          return {
            id: String(data.id || d.id),
            title: data.title || "",
            content: data.content || "",
            date: data.date || "",
            isPinned: !!data.isPinned,
            views: data.views || 0,
          };
        });
      }
      if (apiNotices && Array.isArray(apiNotices)) {
        apiNotices.forEach((an: Notice) => {
          const exists = noticesList.some(n => String(n.id) === String(an.id));
          if (!exists) {
            noticesList.push({
              id: String(an.id),
              title: an.title || "",
              content: an.content || "",
              date: an.date || "",
              isPinned: !!an.isPinned,
              views: an.views || 0
            });
          }
        });
      }
      noticesList.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.date.localeCompare(a.date);
      });
      setNotices(noticesList);

      // 사진은 Firestore에서 별도 로드
      await loadPhotos();

      // Diagnoses
      let diagList: DiagnoseItem[] = [];
      if (fsDiagsSnap) {
        diagList = fsDiagsSnap.docs.map((d) => {
          const data = d.data();
          return {
            id: String(data.id || d.id),
            age: data.age || "",
            gender: data.gender || "",
            sleep: data.sleep || "",
            eat: data.eat || "",
            poop: data.poop || "",
            symptoms: data.symptoms || "",
            createdAt: data.createdAt || "",
            analysis: data.analysis || "",
            doctorNotes: data.doctorNotes || "",
          };
        });
      }
      if (apiDiags && Array.isArray(apiDiags)) {
        apiDiags.forEach((ad: DiagnoseItem) => {
          const exists = diagList.some(d => String(d.id) === String(ad.id));
          if (!exists) {
            diagList.push({
              id: String(ad.id),
              age: ad.age || "",
              gender: ad.gender || "",
              sleep: ad.sleep || "",
              eat: ad.eat || "",
              poop: ad.poop || "",
              symptoms: ad.symptoms || "",
              createdAt: ad.createdAt || "",
              analysis: ad.analysis || "",
              doctorNotes: ad.doctorNotes || ""
            });
          }
        });
      }
      diagList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setDiagnoses(diagList);
    } catch (e) {
      console.error(e);
    } finally {
      setNoticeLoading(false);
      setDiagLoading(false);
    }
  };

  useEffect(() => {
    const logged = sessionStorage.getItem("samjal_admin_logged_in");
    if (logged === "true") {
      setIsLoggedIn(true);
      loadAllData();
    }
    return () => {
      sessionStorage.removeItem("samjal_admin_logged_in");
    };
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (loginId === "admin" && loginPw === "samjal") {
      setIsLoggedIn(true);
      sessionStorage.setItem("samjal_admin_logged_in", "true");
      setLoginError("");
      loadAllData();
    } else {
      setLoginError("아이디 또는 비밀번호가 삼잘 행정계정과 일치하지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("samjal_admin_logged_in");
    setLoginId("");
    setLoginPw("");
  };

  // Add Notice
  const handleAddNotice = async (e: FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) {
      alert("제목과 내용을 입력해 주십시오.");
      return;
    }
    setNoticeLoading(true);
    try {
      const resp = await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice)
      });
      if (resp.ok) {
        const added = await resp.json();
        try {
          await addDoc(collection(db, "notices"), {
            id: String(added.notice.id),
            title: added.notice.title,
            content: added.notice.content,
            date: added.notice.date,
            isPinned: !!added.notice.isPinned,
            views: added.notice.views
          });
        } catch (fErr) {
          console.warn("Firestore notice write failed:", fErr);
        }
        setNotices(prev => [added.notice, ...prev]);
        setNewNotice({ title: "", content: "", isPinned: false });
        setNoticeMessage("공지 전달문이 정상적으로 원내 전산망에 등록되었습니다.");
        setTimeout(() => setNoticeMessage(""), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setNoticeLoading(false);
    }
  };

  const handleStartEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setNewNotice({ title: notice.title, content: notice.content, isPinned: !!notice.isPinned });
  };

  const handleUpdateNotice = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;
    if (!newNotice.title || !newNotice.content) {
      alert("제목과 내용을 입력해 주십시오.");
      return;
    }
    setNoticeLoading(true);
    try {
      try {
        const snapshot = await getDocs(collection(db, "notices"));
        const targetDoc = snapshot.docs.find(d => String(d.id) === String(editingNotice.id) || String(d.data().id) === String(editingNotice.id));
        if (targetDoc) {
          await updateDoc(doc(db, "notices", targetDoc.id), {
            title: newNotice.title,
            content: newNotice.content,
            isPinned: !!newNotice.isPinned
          });
        }
      } catch (fErr) {
        console.warn("Firestore notice update failed:", fErr);
      }
      const resp = await fetch(`/api/notices/${editingNotice.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice)
      });
      if (resp.ok) {
        const updated = await resp.json();
        setNotices(prev => prev.map(n => Number(n.id) === Number(editingNotice.id) ? updated.notice : n));
        setEditingNotice(null);
        setNewNotice({ title: "", content: "", isPinned: false });
        setNoticeMessage("공지 전달문이 성공적으로 수정 완료되었습니다.");
        setTimeout(() => setNoticeMessage(""), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setNoticeLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingNotice(null);
    setNewNotice({ title: "", content: "", isPinned: false });
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm("공지 전재를 영구 삭제하시겠습니까?")) return;
    try {
      try {
        const snapshot = await getDocs(collection(db, "notices"));
        const targetDoc = snapshot.docs.find(d => String(d.id) === String(id) || String(d.data().id) === String(id));
        if (targetDoc) {
          await deleteDoc(doc(db, "notices", targetDoc.id));
        }
      } catch (fErr) {
        console.warn("Firestore notice delete failed:", fErr);
      }
      const resp = await fetch(`/api/notices/${id}`, { method: "DELETE" });
      if (resp.ok) {
        setNotices(prev => prev.filter(n => Number(n.id) !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ──────────────────────────────────────────────
  // 사진 관련 — Firebase Storage + Firestore 기반
  // ──────────────────────────────────────────────

  // 파일 선택 시 File 객체 저장 + 미리보기 생성
  const handleNewPhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setPhotoAddError("이미지 크기는 최대 5MB까지 업로드 가능합니다.");
        return;
      }
      setPhotoAddError("");
      setNewPhotoFile(file);
      // 미리보기용 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setNewPhotoPreview(previewUrl);
    }
  };

  // 사진 추가 — Firebase Storage에 업로드 후 Firestore에 URL 저장
  const handleAddPhotoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPhotoFile) {
      setPhotoAddError("업로드할 원내 사진을 선택해 주십시오.");
      return;
    }
    if (!newPhotoTitle || !newPhotoDesc) {
      setPhotoAddError("제목과 설명을 모두 채워주십시오.");
      return;
    }

    setPhotoUploading(true);
    setPhotoAddError("");

    try {
      // 1. Firebase Storage에 파일 업로드
      const fileName = `${Date.now()}_${newPhotoFile.name}`;
      const storageRef = ref(storage, `site-images/gallery/${fileName}`);
      await uploadBytes(storageRef, newPhotoFile);

      // 2. 다운로드 URL 획득
      const imageUrl = await getDownloadURL(storageRef);

      // 3. Firestore에 사진 정보 저장
      const docRef = await addDoc(collection(db, "galleryPhotos"), {
        tag: "hospital-added",
        tagLabel: newPhotoTagLabel || "원내 인증 전경",
        title: newPhotoTitle,
        desc: newPhotoDesc,
        image: imageUrl,
        storagePath: `site-images/gallery/${fileName}`,  // 삭제 시 사용
        branch: newPhotoBranch,
        createdAt: new Date().toISOString(),
      });

      // 4. 로컬 state 업데이트
      const newItem = {
        firestoreId: docRef.id,
        tag: "hospital-added",
        tagLabel: newPhotoTagLabel || "원내 인증 전경",
        title: newPhotoTitle,
        desc: newPhotoDesc,
        image: imageUrl,
        storagePath: `site-images/gallery/${fileName}`,
        branch: newPhotoBranch,
        createdAt: new Date().toISOString(),
      };
      setPhotos(prev => [newItem, ...prev]);

      // 폼 초기화
      setNewPhotoTitle("");
      setNewPhotoDesc("");
      setNewPhotoFile(null);
      setNewPhotoPreview("");
      setNewPhotoTagLabel("원내 인증 전경");
      setNewPhotoBranch("both");
      setPhotoAddError("");
      setIsAddPhotoOpen(false);
    } catch (err) {
      console.error("사진 업로드 실패:", err);
      setPhotoAddError("사진 업로드에 실패했습니다. 다시 시도해 주십시오.");
    } finally {
      setPhotoUploading(false);
    }
  };

  // 사진 삭제 — Storage + Firestore 동시 삭제
  const handleDeletePhoto = async (firestoreId: string, storagePath: string) => {
    if (!confirm("이 원내 갤러리 사진을 영구 삭제하시겠습니까?")) return;
    try {
      // 1. Firestore 문서 삭제
      await deleteDoc(doc(db, "galleryPhotos", firestoreId));

      // 2. Storage 파일 삭제 (storagePath가 있는 경우)
      if (storagePath) {
        try {
          const fileRef = ref(storage, storagePath);
          await deleteObject(fileRef);
        } catch (storageErr) {
          console.warn("Storage 파일 삭제 실패 (무시):", storageErr);
        }
      }

      // 3. 로컬 state 업데이트
      setPhotos(prev => prev.filter((p: any) => p.firestoreId !== firestoreId));
    } catch (err) {
      console.error("사진 삭제 실패:", err);
      alert("사진 삭제에 실패했습니다.");
    }
  };

  // 사진 정보 편집 (제목/설명만 수정 — Firestore 업데이트)
  const handleEditPhoto = (photo: any) => {
    setEditingPhoto(photo);
    setPhotoEditTitle(photo.title);
    setPhotoEditDesc(photo.desc);
  };

  const handleSavePhotoDetails = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    try {
      await updateDoc(doc(db, "galleryPhotos", editingPhoto.firestoreId), {
        title: photoEditTitle,
        desc: photoEditDesc,
      });
      setPhotos(prev => prev.map((p: any) =>
        p.firestoreId === editingPhoto.firestoreId
          ? { ...p, title: photoEditTitle, desc: photoEditDesc }
          : p
      ));
      setEditingPhoto(null);
    } catch (err) {
      console.error("사진 정보 수정 실패:", err);
      alert("수정에 실패했습니다.");
    }
  };

  // ──────────────────────────────────────────────
  // 자가진단 관련 (기존과 동일)
  // ──────────────────────────────────────────────

  const handleDeleteDiagnose = async (id: string) => {
    if (!confirm("해당 AI 자가진단 기록을 관리 전산망에서 영구 삭제하시겠습니까?")) return;
    try {
      try {
        const snapshot = await getDocs(collection(db, "diagnoses"));
        const targetDoc = snapshot.docs.find(d => d.id === id || String(d.data().id) === id);
        if (targetDoc) {
          await deleteDoc(doc(db, "diagnoses", targetDoc.id));
        }
      } catch (fErr) {
        console.warn("Firestore delete issue:", fErr);
      }
      const resp = await fetch(`/api/diagnoses/${id}`, { method: "DELETE" });
      if (resp.ok) {
        setDiagnoses(prev => prev.filter(d => d.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddDiagnose = async (e: FormEvent) => {
    e.preventDefault();
    setAddDiagError("");
    setAddDiagLoading(true);
    try {
      const resp = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: addDiagAge, gender: addDiagGender, sleep: addDiagSleep,
          eat: addDiagEat, poop: addDiagPoop, symptoms: addDiagSymptoms,
          doctorNotes: addDiagDoctorNotes
        })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.diagnosis) {
          try {
            await addDoc(collection(db, "diagnoses"), {
              id: String(data.diagnosis.id),
              sleep: data.diagnosis.sleep || "",
              eat: data.diagnosis.eat || "",
              poop: data.diagnosis.poop || "",
              age: data.diagnosis.age || "",
              gender: data.diagnosis.gender || "",
              symptoms: data.diagnosis.symptoms || "",
              createdAt: data.diagnosis.createdAt || new Date().toISOString(),
              analysis: data.diagnosis.analysis || "",
              doctorNotes: data.diagnosis.doctorNotes || ""
            });
          } catch (fErr) {
            console.warn("Firestore diagnosis write failed:", fErr);
          }
          setDiagnoses(prev => [data.diagnosis, ...prev]);
        } else {
          loadAllData();
        }
        setIsAddingDiagnose(false);
        setAddDiagSleep("자다가 자주 깸");
        setAddDiagEat("가스가 차고 소화가 느림");
        setAddDiagPoop("시원치 못하고 잔변감 있음");
        setAddDiagSymptoms("피로 누적으로 어깨가 뻐근하고 머리가 무거우며 숙면이 어렵습니다.");
        setAddDiagDoctorNotes("");
      } else {
        const errData = await resp.json();
        setAddDiagError(errData.error || "자가진단 기록 추가 처리 중 오류가 발생했습니다.");
      }
    } catch (err: any) {
      console.error(err);
      setAddDiagError("네트워크 서버 통신에 실패했습니다.");
    } finally {
      setAddDiagLoading(false);
    }
  };

  const handleStartEditDiag = (item: DiagnoseItem) => {
    setEditingDiag(item);
    setEditDiagAge(item.age || "40대");
    setEditDiagGender(item.gender || "여성");
    setEditDiagSleep(item.sleep || "");
    setEditDiagEat(item.eat || "");
    setEditDiagPoop(item.poop || "");
    setEditDiagSymptoms(item.symptoms || "");
    setEditDiagAnalysis(item.analysis || "");
    setEditDiagDoctorNotes(item.doctorNotes || "");
    setEditDiagError("");
  };

  const handleUpdateDiag = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingDiag) return;
    setEditDiagError("");
    setEditDiagLoading(true);
    const updatedFields = {
      age: editDiagAge, gender: editDiagGender, sleep: editDiagSleep,
      eat: editDiagEat, poop: editDiagPoop, symptoms: editDiagSymptoms,
      analysis: editDiagAnalysis, doctorNotes: editDiagDoctorNotes
    };
    try {
      try {
        const snapshot = await getDocs(collection(db, "diagnoses"));
        const targetDoc = snapshot.docs.find(d => d.id === editingDiag.id || String(d.data().id) === editingDiag.id);
        if (targetDoc) {
          await updateDoc(doc(db, "diagnoses", targetDoc.id), updatedFields);
        }
      } catch (fErr) {
        console.warn("Firestore update issue:", fErr);
      }
      const resp = await fetch(`/api/diagnoses/${editingDiag.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      });
      if (resp.ok) {
        setDiagnoses(prev => prev.map(item => item.id === editingDiag.id ? { ...item, ...updatedFields } : item));
        setEditingDiag(null);
      } else {
        const errData = await resp.json();
        setEditDiagError(errData.error || "자가진단 수정 저장에 실패했습니다.");
      }
    } catch (err: any) {
      console.error(err);
      setEditDiagError("서버와의 통신 오류가 발생했습니다.");
    } finally {
      setEditDiagLoading(false);
    }
  };

  const toggleExpandDiag = (id: string) => {
    setExpandedDiag(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderParsedMarkdown = (rawText: string) => {
    if (!rawText) return null;
    return rawText.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("###")) {
        return <h3 key={idx} className="text-sm sm:text-base font-serif font-bold text-[#2A2826] border-b border-amber-900/10 pb-2 mt-4 mb-2">{trimmed.replace("###", "").trim()}</h3>;
      }
      if (trimmed.startsWith("####")) {
        return <h4 key={idx} className="text-xs sm:text-sm font-serif font-bold text-[#C5A059] mt-3 mb-1">{trimmed.replace("####", "").trim()}</h4>;
      }
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return <p key={idx} className="font-serif font-semibold text-[#2A2826] mt-2 text-xs sm:text-sm">{trimmed.replace(/\*\*/g, "").trim()}</p>;
      }
      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        let clean = trimmed.substring(1).trim();
        const parts = clean.split("**");
        return (
          <li key={idx} className="list-none pl-3 relative text-[11px] sm:text-xs font-serif text-[#5C6351] my-1 leading-relaxed text-left">
            <span className="absolute left-0 text-amber-600">&bull;</span>
            {parts.map((p, pIdx) => (pIdx % 2 === 1 ? <strong key={pIdx} className="text-[#2A2826] font-bold">{p}</strong> : p))}
          </li>
        );
      }
      if (trimmed.startsWith(">")) {
        return (
          <blockquote key={idx} className="border-l-2 border-amber-600 pl-3 py-1.5 italic font-serif text-[#5C6351] bg-[#DFD5C6]/15 rounded-r my-3 text-xs text-left">
            {trimmed.replace(">", "").trim()}
          </blockquote>
        );
      }
      if (trimmed === "---") {
        return <hr key={idx} className="my-4 border-t border-slate-100" />;
      }
      return <p key={idx} className="text-[11px] sm:text-xs font-serif text-[#5C6351] leading-relaxed my-1 text-left">{trimmed}</p>;
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-[#FAF9F5] min-h-screen pt-28 sm:pt-32 pb-16 flex items-center justify-center animate-fadeIn px-4">
        <div className="w-full max-w-md bg-white border border-[#DFD5C6]/60 rounded-2xl shadow-xl p-8 relative overflow-hidden text-left font-sans">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0F2C59]" />
          <div className="text-center space-y-2 mb-6">
            <span className="text-[10px] font-bold text-[#0F2C59] tracking-widest uppercase block">Administrative Security</span>
            <h2 className="text-2xl font-serif font-extrabold text-[#2A2826] tracking-tight">삼잘 원내 스마트 행정 센터</h2>
            <p className="text-xs text-slate-400">안전한 원무 및 환무 관리를 위해 로그인을 완료해 주십시오.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">행정 계정 ID</label>
              <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="ID를 입력하십시오" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] tracking-wide placeholder-slate-300" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">보안 비밀번호 PASSWORD</label>
              <input type="password" value={loginPw} onChange={(e) => setLoginPw(e.target.value)} placeholder="비밀번호를 입력하십시오" className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] tracking-wide placeholder-slate-300" required />
            </div>
            {loginError && <p className="text-rose-500 text-[11px] leading-relaxed font-semibold">{loginError}</p>}
            <button type="submit" className="w-full py-3 bg-[#0F2C59] hover:bg-opacity-90 active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-md shadow-blue-950/10 cursor-pointer mt-2 text-center">보안 인증 로그인</button>
          </form>
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-mono">IP SECURE NETWORKS / SAMJAL KOREAN MEDICINE CLINIC</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen pt-28 sm:pt-32 pb-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-10 relative">
          <div className="flex justify-end mb-4 sm:mb-0 sm:absolute sm:top-0 sm:right-0">
            <button onClick={handleLogout} className="px-3 py-1.5 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-lg text-xs font-sans transition-all cursor-pointer flex items-center gap-1">행정망 로그아웃</button>
          </div>
          <p className="text-xs sm:text-sm text-[#0F2C59] tracking-widest font-sans uppercase font-bold">Administrative Control Console</p>
          <h2 className="text-3xl sm:text-4xl font-sans text-slate-800 font-extrabold tracking-tight">삼잘 원내 스마트 행정 센터</h2>
          <div className="w-12 h-1 bg-[#0F2C59] mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm font-sans text-slate-500 max-w-xl mx-auto leading-relaxed pt-2">원내 공지사항 게재 상황 및 청정 원내 전시 갤러리 롤링 이미지를 통합 관리하는 원장실 중앙 행정망입니다.</p>
        </div>

        <div className="flex border-b border-slate-200 mb-8 justify-center sm:justify-start gap-2">
          <button onClick={() => setActiveSubTab("notices")} className={`px-5 py-3 font-sans text-xs sm:text-sm font-extrabold tracking-tight border-b-2 transition-all cursor-pointer flex items-center gap-2 ${activeSubTab === "notices" ? "border-[#0F2C59] text-[#0F2C59]" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
            <Megaphone className="w-4 h-4" /><span>공정 사항 게재 ({notices.length})</span>
          </button>
          <button onClick={() => setActiveSubTab("photos")} className={`px-5 py-3 font-sans text-xs sm:text-sm font-extrabold tracking-tight border-b-2 transition-all cursor-pointer flex items-center gap-2 ${activeSubTab === "photos" ? "border-[#0F2C59] text-[#0F2C59]" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
            <Image className="w-4 h-4" /><span>인테리어 롤링 관리 ({photos.length})</span>
          </button>
          <button onClick={() => setActiveSubTab("diagnoses")} className={`px-5 py-3 font-sans text-xs sm:text-sm font-extrabold tracking-tight border-b-2 transition-all cursor-pointer flex items-center gap-2 ${activeSubTab === "diagnoses" ? "border-[#0F2C59] text-[#0F2C59]" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
            <Activity className="w-4 h-4" /><span>자가진단 기록 ({diagnoses.length})</span>
          </button>
        </div>

        {/* 공지사항 탭 */}
        {activeSubTab === "notices" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm text-left relative">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0F2C59] rounded-t-2xl" />
              <div className="space-y-1.5 mb-5 pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold font-sans text-[#0F2C59] uppercase tracking-widest block">Notice Publication Draft</span>
                <h3 className="text-lg font-sans font-extrabold text-slate-800">{editingNotice ? "공지사항 수정" : "신규 공지사항 게재"}</h3>
                <p className="text-xs font-sans text-slate-400">{editingNotice ? "선택한 공지 전재의 제목과 본문 내용을 세부 조정하십시오." : "본 포탈에 게재되는 사항은 전 원내 게시망 및 대기실 텔레메트리에 즉시 공시됩니다."}</p>
              </div>
              {noticeMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-xs text-emerald-700 mb-4 animate-scaleUp">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" /><span>{noticeMessage}</span>
                </div>
              )}
              <form onSubmit={editingNotice ? handleUpdateNotice : handleAddNotice} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans text-slate-600 font-bold mb-1">공지 전달문 제목 *</label>
                  <input type="text" required placeholder="예: [안내] 2026년 하절기 원내 대체휴무 일정 알림" value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#0F2C59] font-sans" />
                </div>
                <div>
                  <label className="block text-xs font-sans text-slate-600 font-bold mb-1">상세 전재 문안 *</label>
                  <textarea rows={6} required placeholder="환우분들께 정제되고 따뜻하게 다가갈 수 있는 어조와 꼼꼼한 약제 수급 정보, 운영 일시를 기재하십시오." value={newNotice.content} onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })} className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#0F2C59] font-sans leading-relaxed resize-none" />
                </div>
                <div className="flex items-center gap-2 py-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200/40">
                  <input type="checkbox" id="isPinned" checked={newNotice.isPinned} onChange={(e) => setNewNotice({ ...newNotice, isPinned: e.target.checked })} className="w-4 h-4 text-[#0F2C59] border-slate-300 rounded focus:ring-[#0F2C59] cursor-pointer" />
                  <label htmlFor="isPinned" className="text-xs font-sans text-slate-600 font-extrabold cursor-pointer select-none">이 공지사항을 중요 공지(최상단 고정)로 설정</label>
                </div>
                <div className="space-y-2">
                  <button type="submit" disabled={noticeLoading} className="w-full py-2.5 bg-[#0F2C59] hover:bg-slate-800 text-white font-sans text-xs sm:text-sm font-bold tracking-tight rounded-xl cursor-pointer transition-all hover:shadow-md flex items-center justify-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /><span>{editingNotice ? "공지 수정 완료하기" : "원내 공지 게재하기"}</span>
                  </button>
                  {editingNotice && (
                    <button type="button" onClick={handleCancelEdit} className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-500 font-sans text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition-all text-center">수정 취소</button>
                  )}
                </div>
              </form>
            </div>
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
              <span className="text-[10px] font-bold font-sans text-slate-400 uppercase tracking-wider block mb-1">Active Announcements</span>
              <h3 className="text-lg font-sans font-extrabold text-slate-800 mb-4 pb-2 border-b border-slate-100">게재 중인 공지 전산망 ({notices.length})</h3>
              {noticeLoading ? (
                <div className="text-center py-12 text-xs font-sans text-slate-400">공지 목록 데이터 갱신 중...</div>
              ) : notices.length === 0 ? (
                <div className="text-center py-12 text-xs font-sans text-slate-400">등록된 공지 일람이 비어 있습니다.</div>
              ) : (
                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                  {notices.map((item) => (
                    <div key={item.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl flex items-start gap-3 justify-between">
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.isPinned && <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[9px] font-sans font-extrabold rounded">필독고정</span>}
                          <h4 className="text-sm font-sans font-extrabold text-slate-800 truncate">{item.title}</h4>
                        </div>
                        <p className="text-[11px] font-sans text-slate-500 line-clamp-2 leading-relaxed">{item.content}</p>
                        <div className="flex items-center gap-4 text-[10px] text-slate-400">
                          <span>등록일: {item.date}</span><span>조회수: {item.views}회</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 self-center">
                        <button onClick={() => handleStartEdit(item)} className={`p-1.5 rounded-lg shrink-0 cursor-pointer transition-colors ${editingNotice?.id === item.id ? "bg-amber-100 text-amber-700" : "hover:bg-amber-50 text-amber-600"}`} title="공지 수정"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteNotice(Number(item.id))} className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg shrink-0 cursor-pointer transition-colors" title="공지 삭제"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 사진 관리 탭 */}
        {activeSubTab === "photos" && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm text-left animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-sans text-[#0F2C59] uppercase tracking-wider block">Marquee Showcase Media Controller</span>
                <h3 className="text-lg font-sans font-extrabold text-slate-800">인테리어 둘러보기 롤링 이미지 관리</h3>
                <p className="text-xs font-sans text-slate-500 leading-relaxed">
                  현재 전면 마키(Marquee) 슬라이더에 반복 구동되고 있는 사진 목록입니다. <br />
                  설정하신 인테리어 전경들이 원내 안내 화면과 대기실 롤링 팝업창 등에 순차 전시됩니다.
                </p>
              </div>
              <button onClick={() => setIsAddPhotoOpen(true)} className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0F2C59] hover:bg-opacity-90 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-sans font-extrabold cursor-pointer transition-all shadow-sm shrink-0 self-start md:self-center">
                <Plus className="w-4 h-4" /><span>신규 전경 추가</span>
              </button>
            </div>

            {photos.length === 0 ? (
              <div className="text-center py-16 text-xs font-sans text-slate-400">등록된 사진이 없습니다. 신규 전경 추가 버튼을 눌러 사진을 업로드해 주십시오.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((item: any, index: number) => (
                  <div key={item.firestoreId || index} className="border border-slate-200/80 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group bg-slate-50 relative">
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        <span className="px-2 py-0.5 text-[9px] font-sans font-bold uppercase rounded-md text-slate-50 bg-indigo-600">{item.tagLabel}</span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-2">
                      <div>
                        <h5 className="text-xs sm:text-sm font-sans font-extrabold text-slate-800 truncate">{item.title}</h5>
                        <p className="text-[11px] font-sans text-slate-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 w-full">
                        <button onClick={() => handleEditPhoto(item)} className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 text-amber-700 rounded-lg text-xs font-sans font-bold cursor-pointer transition-all active:scale-95" title="사진 정보 편집">
                          <Pencil className="w-3 h-3" /><span>편집</span>
                        </button>
                        <button onClick={() => handleDeletePhoto(item.firestoreId, item.storagePath)} className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200/50 text-rose-600 rounded-lg text-xs font-sans font-bold cursor-pointer transition-all active:scale-95" title="사진 삭제">
                          <Trash2 className="w-3 h-3" /><span>삭제</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-center text-[10.5px] text-slate-400 mt-8">
              ※ 해당 전산망은 Firebase Cloud Storage와 실시간 동기화되어 있으며, 변경 즉시 홈페이지 전면에 반영됩니다.
            </p>
          </div>
        )}

        {/* 자가진단 탭 */}
        {activeSubTab === "diagnoses" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm text-left relative">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0F2C59] rounded-t-2xl" />
              <div className="space-y-1 mb-6 pb-3 border-b border-slate-100 pr-16 sm:pr-24">
                <div className="absolute top-6 right-5 sm:right-6">
                  <button type="button" onClick={() => setIsAddingDiagnose(!isAddingDiagnose)} className="px-3.5 py-1.5 border border-[#0F2C59]/30 text-[#0F2C59] hover:bg-[#0F2C59] hover:text-white rounded-lg text-xs font-sans font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
                    <Plus className="w-3.5 h-3.5" /><span>추가</span>
                  </button>
                </div>
                <span className="text-[10px] font-bold font-sans text-[#0F2C59] uppercase tracking-wider block">AI Self-Diagnosis Logs</span>
                <h3 className="text-lg font-sans font-extrabold text-slate-800">AI 삼잘 자가 건강진단 기록 보관함</h3>
                <p className="text-xs font-sans text-slate-500 leading-relaxed">환우분들께서 작성하신 AI 삼잘 자가 건강 자가진단 기록 및 전산 자동 발송 보고서 내역입니다.</p>
              </div>

              {isAddingDiagnose && (
                <div className="mb-6 p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-4 animate-slideDown">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#0F2C59]" />
                      <h4 className="text-sm font-extrabold text-[#2A2826] font-sans">자가진단 및 원장 통합 소견 신규 추가</h4>
                    </div>
                    <button type="button" onClick={() => setIsAddingDiagnose(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"><X className="w-4 h-4" /></button>
                  </div>
                  <form onSubmit={handleAddDiagnose} className="space-y-4 font-sans text-xs text-[#2A2826]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">연령군 *</label>
                        <select value={addDiagAge} onChange={(e) => setAddDiagAge(e.target.value)} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/10">
                          <option value="20대">20대</option><option value="30대">30대</option><option value="40대">40대</option><option value="50대">50대</option><option value="60대 이상">60대 이상</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">성별 구분 *</label>
                        <div className="flex gap-2">
                          {["여성", "남성"].map(g => (
                            <button key={g} type="button" onClick={() => setAddDiagGender(g)} className={`flex-1 py-2 text-center rounded-xl font-bold transition-all border text-xs cursor-pointer ${addDiagGender === g ? "bg-[#0F2C59] text-white border-[#0F2C59]" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}>{g}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div><label className="block text-[#475569] text-xs font-bold mb-1.5">수면상태 *</label><input type="text" required value={addDiagSleep} onChange={(e) => setAddDiagSleep(e.target.value)} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none text-xs" /></div>
                      <div><label className="block text-[#475569] text-xs font-bold mb-1.5">식사상태 *</label><input type="text" required value={addDiagEat} onChange={(e) => setAddDiagEat(e.target.value)} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none text-xs" /></div>
                      <div><label className="block text-[#475569] text-xs font-bold mb-1.5">배변상태 *</label><input type="text" required value={addDiagPoop} onChange={(e) => setAddDiagPoop(e.target.value)} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none text-xs" /></div>
                    </div>
                    <div><label className="block text-xs font-bold text-slate-600 mb-1.5">주요 진술 증상 *</label><textarea required value={addDiagSymptoms} onChange={(e) => setAddDiagSymptoms(e.target.value)} rows={2} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none text-xs leading-relaxed resize-none" /></div>
                    <div><label className="block text-xs font-bold text-slate-600 mb-1.5">원장단 종합 처방 (옵션)</label><textarea value={addDiagDoctorNotes} onChange={(e) => setAddDiagDoctorNotes(e.target.value)} rows={3} className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none text-xs leading-relaxed resize-none font-bold text-[#0F2C59]" /></div>
                    {addDiagError && <p className="text-rose-500 font-semibold text-xs">{addDiagError}</p>}
                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => setIsAddingDiagnose(false)} className="px-4 py-2 hover:bg-slate-200 text-slate-500 rounded-xl font-bold transition-all text-xs cursor-pointer">취소하기</button>
                      <button type="submit" disabled={addDiagLoading} className="px-5 py-2 bg-[#0F2C59] hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer text-xs">{addDiagLoading ? "등록 중..." : "진단기록 및 소견 즉시등록"}</button>
                    </div>
                  </form>
                </div>
              )}

              {diagLoading ? (
                <div className="text-center py-12 text-xs font-sans text-slate-400 animate-pulse">자가진단 기록 전산망 동기화 중...</div>
              ) : diagnoses.length === 0 ? (
                <div className="text-center py-12 text-xs font-sans text-slate-400">아직 축적된 자가 진단 내역이 없습니다.</div>
              ) : (
                <div className="space-y-4">
                  {diagnoses.map((item) => {
                    const isExpanded = !!expandedDiag[item.id];
                    const dateFormatted = new Date(item.createdAt).toLocaleString("ko-KR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
                    return (
                      <div key={item.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 hover:bg-slate-50/80 transition-all shadow-sm">
                        <div onClick={() => toggleExpandDiag(item.id)} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer select-none font-sans">
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-sans font-extrabold text-[#2A2826]">익명의 환우 ({item.gender || "미기재"}/{item.age || "미기재"}세)</span>
                                <span className="text-[10px] font-mono text-slate-400">기록번호: {item.id.slice(-6)}</span>
                              </div>
                              <p className="text-[11px] font-sans text-[#7A7571] mt-0.5 truncate max-w-sm sm:max-w-md">증상: <span className="font-bold text-slate-600">{item.symptoms || "특이사항 없음"}</span></p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0">
                            <span className="text-[10.5px] font-mono text-slate-400">{dateFormatted}</span>
                            <div className="flex items-center gap-2">
                              <button onClick={(e) => { e.stopPropagation(); toggleExpandDiag(item.id); }} className="p-1.5 px-3 bg-slate-200 hover:bg-[#0F2C59] hover:text-white text-slate-700 rounded-lg text-[10px] font-sans font-extrabold flex items-center gap-1 cursor-pointer transition-colors">{isExpanded ? "상세접기" : "진단서보기"}</button>
                              <button onClick={(e) => { e.stopPropagation(); handleStartEditDiag(item); }} className="p-1.5 hover:bg-amber-50 text-amber-500 hover:text-amber-600 border border-transparent hover:border-amber-100 rounded-lg cursor-pointer transition-colors" title="진단서 수동 편집"><Pencil className="w-3.5 h-3.5" /></button>
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteDiagnose(item.id); }} className="p-1.5 hover:bg-rose-50 text-rose-500 hover:text-rose-600 border border-transparent hover:border-rose-100 rounded-lg cursor-pointer transition-colors" title="진단서 영구 폐기"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-200/60 bg-white animate-slideDown">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 mt-3 text-left">
                              <div className="p-3 bg-red-50/30 border border-slate-100 rounded-xl"><div className="flex items-center gap-1 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /><span className="text-[10.5px] font-sans text-red-600 font-extrabold uppercase tracking-wide">잘자기 (수면 상태)</span></div><p className="text-xs font-serif text-[#5C6351] leading-relaxed pl-2.5">{item.sleep || "미기재"}</p></div>
                              <div className="p-3 bg-emerald-50/30 border border-slate-100 rounded-xl"><div className="flex items-center gap-1 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /><span className="text-[10.5px] font-sans text-emerald-600 font-extrabold uppercase tracking-wide">잘먹기 (식사 상태)</span></div><p className="text-xs font-serif text-[#5C6351] leading-relaxed pl-2.5">{item.eat || "미기재"}</p></div>
                              <div className="p-3 bg-sky-50/30 border border-slate-100 rounded-xl"><div className="flex items-center gap-1 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" /><span className="text-[10.5px] font-sans text-sky-600 font-extrabold uppercase tracking-wide">잘싸기 (배변 상태)</span></div><p className="text-xs font-serif text-[#5C6351] leading-relaxed pl-2.5">{item.poop || "미기재"}</p></div>
                            </div>
                            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/40 text-left mb-6"><span className="text-[10px] font-extrabold font-sans text-slate-400 block mb-1">환우가 직접 기재한 진술 증상</span><p className="text-xs font-serif text-[#2A2826] leading-relaxed font-light pl-1 italic">"{item.symptoms || "특별한 불편사항 없음"}"</p></div>
                            <div className="relative p-5 sm:p-6 bg-[#FAF9F5] border border-[#DFD5C6]/60 rounded-xl text-left shadow-inner"><div className="prose max-w-none space-y-1">{renderParsedMarkdown(item.analysis)}</div></div>
                            <div className="mt-5 p-5 bg-white border border-slate-200 rounded-xl text-left space-y-3 shadow-xs font-sans">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#0F2C59]" /><span className="text-xs sm:text-sm font-extrabold text-[#2A2826]">원장단 처방 소견 및 자동응답 기초자료 구축</span></div>
                                {item.doctorNotes ? <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold rounded">기본자료 구비 완료</span> : <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold rounded">소견 미등록 상태</span>}
                              </div>
                              <textarea value={tempNotes[item.id] !== undefined ? tempNotes[item.id] : (item.doctorNotes || "")} onChange={(e) => setTempNotes(prev => ({ ...prev, [item.id]: e.target.value }))} rows={3} className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#0F2C59] focus:ring-1 focus:ring-[#0F2C59]/10 resize-none leading-relaxed text-[#2A2826]" />
                              <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-slate-100">
                                <span className="text-[10.5px] font-semibold text-[#0F2C59]">{saveNotesStatus[item.id] || ""}</span>
                                <button type="button" onClick={() => { const notesToSave = tempNotes[item.id] !== undefined ? tempNotes[item.id] : (item.doctorNotes || ""); handleSaveNotes(item.id, notesToSave); }} className="px-4 py-2 bg-[#0F2C59] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all active:scale-[0.97] cursor-pointer">소견 및 대응기준 저장하기</button>
                              </div>
                              {(item.doctorNotes || tempNotes[item.id]) && (
                                <div className="mt-4 p-3.5 bg-amber-50/20 border border-[#DFD5C6]/40 rounded-xl text-left">
                                  <span className="text-[10.5px] font-extrabold text-amber-800 block mb-1">[통합 합성본] 고객 문의 시 자동응답용 기초 시뮬레이션</span>
                                  <div className="text-[11.5px] font-serif text-[#5C6351] space-y-1 pl-1 leading-relaxed">
                                    <p><strong>• 1차 AI 분석:</strong> 위 숙면 부족 혹은 비위 소화 습정체에 대한 천연 식품 가이드 제공 완료.</p>
                                    <p><strong>• 주치의 조치:</strong> {tempNotes[item.id] !== undefined ? tempNotes[item.id] : item.doctorNotes}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* 사진 정보 편집 모달 */}
      {editingPhoto && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-[#DFD5C6]/60 rounded-2xl shadow-2xl p-6 sm:p-8 relative text-left font-sans">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0F2C59] rounded-t-2xl" />
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#0F2C59] uppercase tracking-widest block">Media Editor</span>
                <h3 className="text-lg font-extrabold text-slate-800">원내 전경 사진 정보 편집</h3>
              </div>
              <button onClick={() => setEditingPhoto(null)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-all"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSavePhotoDetails} className="space-y-5">
              <div className="border border-slate-100 rounded-xl overflow-hidden aspect-[16/9] bg-slate-50 mb-4">
                <img src={editingPhoto.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">사진 제목 *</label>
                <input type="text" required value={photoEditTitle} onChange={(e) => setPhotoEditTitle(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">사진 소개 문구 *</label>
                <textarea rows={4} required value={photoEditDesc} onChange={(e) => setPhotoEditDesc(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans leading-relaxed resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditingPhoto(null)} className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 font-sans text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition-all text-center">취소하기</button>
                <button type="submit" className="flex-1 py-2.5 bg-[#0F2C59] hover:bg-opacity-90 active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer text-center">변경사항 저장</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 신규 사진 추가 모달 */}
      {isAddPhotoOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-[#DFD5C6]/60 rounded-2xl shadow-2xl p-6 sm:p-8 relative text-left font-sans">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0F2C59] rounded-t-2xl" />
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#0F2C59] uppercase tracking-widest block">Media Register</span>
                <h3 className="text-lg font-extrabold text-slate-800">신규 원내 전경 사진 기재</h3>
              </div>
              <button onClick={() => { setIsAddPhotoOpen(false); setNewPhotoTitle(""); setNewPhotoDesc(""); setNewPhotoFile(null); setNewPhotoPreview(""); setNewPhotoTagLabel("원내 인증 전경"); setNewPhotoBranch("both"); setPhotoAddError(""); }} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer transition-all"><X className="w-4 h-4" /></button>
              
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">전경 사진 파일 선택 *</label>
                {newPhotoPreview ? (
                  <div className="relative border border-slate-100 rounded-xl overflow-hidden aspect-[16/9] bg-slate-50 mb-2 flex items-center justify-center">
                    <img src={newPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => { setNewPhotoFile(null); setNewPhotoPreview(""); }} className="absolute top-2 right-2 bg-slate-900/70 hover:bg-slate-900 text-white p-1.5 rounded-full transition-all cursor-pointer" title="사진 삭제"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-200 hover:border-[#0F2C59]/40 bg-slate-50/50 hover:bg-slate-50/85 rounded-xl aspect-[16/9] mb-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all p-4 text-center group">
                    <div className="p-2.5 bg-slate-100 group-hover:bg-indigo-50 text-slate-400 group-hover:text-[#0F2C59] rounded-full transition-colors"><Upload className="w-5 h-5 pointer-events-none" /></div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">원내 로비, 치료실 등 사진 업로드</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">최대 권장 해상도 @2x (최대 5MB)</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleNewPhotoUpload} className="hidden" />
                  </label>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1.5">
                  해당 지점 *
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "nowon", label: "노원점" },
                    { value: "guri", label: "구리점" },
                    { value: "both", label: "공통 (양 지점)" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setNewPhotoBranch(opt.value)}
                      className={`flex-1 py-2 text-center rounded-xl font-bold transition-all border text-xs cursor-pointer ${
                        newPhotoBranch === opt.value
                          ? "bg-[#0F2C59] text-white border-[#0F2C59]"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#475569] mb-1.5">구분 꼬리표 (Tag) *</label>
                <input type="text" required value={newPhotoTagLabel} onChange={(e) => setNewPhotoTagLabel(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans font-bold" placeholder="예: 대기실 & 접수데스크, 치료실 등" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">사진 제목 *</label>
                <input type="text" required value={newPhotoTitle} onChange={(e) => setNewPhotoTitle(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans" placeholder="예: 아늑하고 깔끔한 1인 대기실" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">사진 소개 문구 *</label>
                <textarea rows={3} required value={newPhotoDesc} onChange={(e) => setNewPhotoDesc(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans leading-relaxed resize-none" placeholder="대기실 롤링 패널에 송출될 전경 소개글을 채워주십시오" />
              </div>

              {photoAddError && (
                <div className="text-center text-xs text-red-500 font-bold py-1 bg-red-50 rounded-lg">{photoAddError}</div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setIsAddPhotoOpen(false); setNewPhotoTitle(""); setNewPhotoDesc(""); setNewPhotoFile(null); setNewPhotoPreview(""); setNewPhotoTagLabel("원내 인증 전경"); setNewPhotoBranch("both"); setPhotoAddError(""); }} className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 font-sans text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition-all text-center">취소하기</button>
                <button type="submit" disabled={photoUploading} className="flex-1 py-2.5 bg-[#0F2C59] hover:bg-opacity-90 active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer text-center disabled:opacity-60 disabled:cursor-not-allowed">
                  {photoUploading ? "업로드 중..." : "신규 사진 추가"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 자가진단 수정 모달 */}
      {editingDiag && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-fadeIn">
          <div className="w-full max-w-2xl bg-white border border-[#DFD5C6]/60 rounded-2xl shadow-2xl p-6 sm:p-8 relative text-left font-sans max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0F2C59] rounded-t-2xl" />
            <button onClick={() => setEditingDiag(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors"><X className="w-5 h-5" /></button>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0"><Pencil className="w-5 h-5" /></div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#2A2826] font-sans">자가진단 기록 수동 변경</h3>
                <p className="text-[11px] text-[#7A7571] mt-0.5 font-sans">환우의 인적 사항, 삼잘 상태 및 원장의 피드백 소견을 직접 보완하거나 정정할 수 있습니다.</p>
              </div>
            </div>
            <form onSubmit={handleUpdateDiag} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">연령 분류 *</label>
                  <select value={editDiagAge} onChange={(e) => setEditDiagAge(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans">
                    {["10대", "20대", "30대", "40대", "50대", "60대 이상"].map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">성별 구분 *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["여성", "남성"].map(g => (
                      <button key={g} type="button" onClick={() => setEditDiagGender(g)} className={`py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${editDiagGender === g ? "bg-[#0F2C59] text-white border-[#0F2C59]" : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600"}`}>{g}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">수면 상태</label><input type="text" value={editDiagSleep} onChange={(e) => setEditDiagSleep(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans" /></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">식사 상태</label><input type="text" value={editDiagEat} onChange={(e) => setEditDiagEat(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans" /></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1.5">배변 상태</label><input type="text" value={editDiagPoop} onChange={(e) => setEditDiagPoop(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans" /></div>
              </div>
              <div><label className="block text-xs font-bold text-slate-600 mb-1.5">직접 진술한 증상</label><textarea rows={2} value={editDiagSymptoms} onChange={(e) => setEditDiagSymptoms(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans leading-relaxed resize-none" /></div>
              <div><label className="block text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />AI 1차 자가진단 분석 결과</label><textarea rows={5} value={editDiagAnalysis} onChange={(e) => setEditDiagAnalysis(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] leading-relaxed resize-y" /></div>
              <div><label className="block text-xs font-bold text-slate-600 mb-1.5">원장 보완 처방 및 후속 소견</label><textarea rows={3} value={editDiagDoctorNotes} onChange={(e) => setEditDiagDoctorNotes(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C59]/25 focus:border-[#0F2C59] transition-all text-[#2A2826] font-sans leading-relaxed resize-y" /></div>
              {editDiagError && <div className="text-center text-xs text-red-500 font-bold py-1 bg-red-50 rounded-lg">{editDiagError}</div>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditingDiag(null)} className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 font-sans text-xs sm:text-sm font-bold rounded-xl cursor-pointer transition-all text-center">취소하기</button>
                <button type="submit" disabled={editDiagLoading} className="flex-1 py-2.5 bg-[#0F2C59] hover:bg-opacity-90 active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer text-center">{editDiagLoading ? "수정 내용 저장 중..." : "진단기록 수정 완료"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
