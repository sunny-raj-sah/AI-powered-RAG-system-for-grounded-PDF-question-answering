import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  BookOpen,
  KeyRound,
  Eye,
  EyeOff,
  UploadCloud,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  BookmarkCheck,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function BookQA() {
  // API key
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);

  // Upload
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState({
    status: "idle",
    message: "",
  });
  const fileInputRef = useRef(null);

  // Ask
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [askState, setAskState] = useState({ status: "idle", message: "" });

  const keyHeaders = () => (apiKey ? { "x-api-key": apiKey } : {});

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an OpenAI API key.");

      return;
    }

    sessionStorage.setItem("OPENAI_API_KEY", apiKey);
    setApiKey(apiKey.trim());
    setKeySaved(true);
    toast.success("OpenAI API key saved.");
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleUpload = async () => {
    if (!file) {
      const message = "Choose a PDF before uploading.";
      setUploadState({
        status: "error",
        message: "Choose a PDF before uploading.",
      });
      toast.error(message);
      return;
    }
    const formData = new FormData();
    formData.append("book", file);

    setUploadState({
      status: "loading",
      message: "Reading pages and building chunks…",
    });

    try {
      const response = await fetch(`${API_BASE}/api/book/upload`, {
        method: "POST",
        headers: { ...keyHeaders() },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.details || data.error || data.message || "Upload failed",
        );
      setUploadState({
        status: "success",
        message: `Indexed ${data.pages} pages into ${data.totalChunks} chunks.`,
      });
      toast.success("Book uploaded and indexed successfully.");
    } catch (err) {
      const message = err.message || "Upload failed. Is the server running?";

      setUploadState({
        status: "error",
        message,
      });

      toast.error(message);

      //  setUploadState({ status: "error", message: err.message || "Upload failed. Is the server running?" });
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) {
      const message = "Type a question first.";
      setAskState({ status: "error", message: "Type a question first." });
      toast.error(message);
      return;
    }
    setAskState({ status: "loading", message: "" });
    setAnswer("");

    try {
      const response = await fetch(`${API_BASE}/api/qa/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...keyHeaders(),
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.details || data.error || data.message || "Request failed",
        );
      setAnswer(data.answer);
      setAskState({ status: "success", message: "" });
    } catch (err) {
      const message = err.message || "Failed to get an answer.";
      setAskState({
        status: "error",
        message: err.message || "Failed to get an answer.",
      });
      toast.error(message);
    }
  };

  useEffect(() => {
    const savedKey = sessionStorage.getItem("OPENAI_API_KEY");

    if (savedKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApiKey(savedKey);
      setKeySaved(true);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#101319",
        color: "#E9E4D8",
        fontFamily: "'Source Serif 4', 'Georgia', serif",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1B2130",
            color: "#E9E4D8",
            border: "1px solid #2C3346",
            fontFamily: "Inter, sans-serif",
          },
        }}
      />
      <style>{`
         @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
         .sans { font-family: 'Inter', sans-serif; }
         .mono { font-family: 'IBM Plex Mono', monospace; }
         input::placeholder, textarea::placeholder { color: #6B7180; }
         .field:focus-visible, .btn:focus-visible {
           outline: 2px solid #C89B4A;
           outline-offset: 2px;
         }
         .app-shell { display: flex; min-height: 100vh; }
         .sidebar {
           width: 300px;
           flex-shrink: 0;
           border-right: 1px solid #232A3B;
           padding: 36px 22px;
           background: #151A25;
         }
        
        .main {
            flex: 1;
             min-width: 0;
             padding: 40px 48px;
             display: flex;
             justify-content: center;
             box-sizing: border-box;
                    }
        
           .main-inner {
               width: 100%;
                max-width: 100%;
                   }
         @media (max-width: 860px) {
           .app-shell { flex-direction: column; }
           .sidebar { width: 100%; box-sizing: border-box; border-right: none; border-bottom: 1px solid #232A3B; padding: 22px; }
           .main { padding: 28px 20px; }
         }
         @media (prefers-reduced-motion: reduce) {
           * { transition: none !important; animation: none !important; }
         }
         @keyframes spin { to { transform: rotate(360deg); } }
       `}</style>

      <div className="app-shell">
        {/* SIDEBAR — setup: key + book */}
        <aside className="sidebar">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "#1e232e",
                border: "1px solid #adb2c1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BookOpen size={17} color="#C89B4A" strokeWidth={1.75} />
            </div>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                margin: 10,
                letterSpacing: "-0.01em",
                color: "white",
              }}
            >
              Ask the Book
            </h1>
          </div>

          {/* API key */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap:8,
                marginBottom: 6,
              }}
            >
              <KeyRound size={14} color="#C89B4A" />
              <h2
                className="sans"
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  margin: 0,
                  color: "#C7CBD6",
                }}
              >
                API key
              </h2>
              {keySaved && (
                <span
                  className="sans"
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    fontSize: 11,
                    color: "#7FAE93",
                  }}
                >
                  <BookmarkCheck size={12} /> Saved
                </span>
              )}
            </div>
            <p
              className="sans"
              style={{
                fontSize: 11.5,
                color: "#7B8092",
                margin: "0 0 10px",
                lineHeight: 1.5,
              }}
            >
              Provide your OpenAI key to use OpenAI models. Leave empty to use
              HuggingFace embeddings + Groq AI.
            </p>
            <div style={{ position: "relative" }}>
              <input
                className="field mono"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setKeySaved(false);
                }}
                placeholder="OpenAI API key(sk-...)(optional)"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#12161F",
                  border: "1px solid #2C3346",
                  borderRadius: 8,
                  padding: "9px 36px 9px 11px",
                  color: "#E9E4D8",
                  fontSize: 12.5,
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey((s) => !s)}
                aria-label={showKey ? "Hide key" : "Show key"}
                className="btn"
                style={{
                  position: "absolute",
                  right: 7,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#8B90A0",
                  padding: 3,
                }}
              >
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <button
              onClick={handleSaveKey}
              className="btn sans"
              style={{
                width: "100%",
                marginTop: 8,
                background: "#C89B4A",
                color: "#12161F",
                border: "none",
                borderRadius: 8,
                padding: "8px 0",
                fontWeight: 600,
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              Save key
            </button>
          </div>

          <div
            style={{ height: 1, background: "#232A3B", margin: "0 0 -10px" }}
          />

          {/* Upload */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <UploadCloud size={14} color="#C89B4A" />
              <h2
                className="sans"
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  margin: 0,
                  color: "#C7CBD6",
                }}
              >
                Book
              </h2>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: "1.5px dashed #3A4258",
                borderRadius: 10,
                padding: "20px 14px",
                textAlign: "center",
                cursor: "pointer",
                background: "#12161F",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <FileText
                size={18}
                color={file ? "#C89B4A" : "#5C6273"}
                style={{ marginBottom: 6 }}
              />
              <div
                className="sans"
                style={{
                  fontSize: 12,
                  color: "#C7CBD6",
                  wordBreak: "break-word",
                }}
              >
                {file ? file.name : "Click to choose a PDF"}
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={uploadState.status === "loading"}
              className="btn sans"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                marginTop: 10,
                background: "#3E6259",
                color: "#EAF2ED",
                border: "none",
                borderRadius: 8,
                padding: "9px 0",
                fontWeight: 600,
                fontSize: 12.5,
                cursor:
                  uploadState.status === "loading" ? "default" : "pointer",
                opacity: uploadState.status === "loading" ? 0.75 : 1,
              }}
            >
              {uploadState.status === "loading" ? (
                <Loader2
                  size={14}
                  style={{ animation: "spin 0.8s linear infinite" }}
                />
              ) : (
                <UploadCloud size={14} />
              )}
              {uploadState.status === "loading"
                ? "Uploading…"
                : "Upload & index"}
            </button>

            <div style={{ marginTop: 8 }}>
              <StatusLine state={uploadState} />
            </div>
          </div>
        </aside>

        {/* MAIN — the question, front and center */}
        <main className="main">
          <div className="main-inner">
            <div style={{ marginBottom: 26 }}>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: "0 0 6px",
                  letterSpacing: "-0.01em",
                }}
              >
                Ask a question
              </h2>
              <p
                className="sans"
                style={{ margin: 0, fontSize: 14, color: "#9AA0AF" }}
              >
                Answers are drawn strictly from the book you've indexed.
              </p>
            </div>

            <textarea
              className="field sans"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What does chapter 3 say about…"
              rows={4}
              autoFocus
              style={{
                width: "100%",
                boxSizing: "border-box",
                background: "#1B2130",
                border: "1px solid #2C3346",
                borderRadius: 12,
                padding: "16px 18px",
                color: "#E9E4D8",
                fontSize: 16,
                lineHeight: 1.5,
                resize: "vertical",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 14,
              }}
            >
              <button
                onClick={handleAsk}
                disabled={askState.status === "loading"}
                className="btn sans"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#C89B4A",
                  color: "#12161F",
                  border: "none",
                  borderRadius: 9,
                  padding: "12px 24px",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: askState.status === "loading" ? "default" : "pointer",
                  opacity: askState.status === "loading" ? 0.75 : 1,
                }}
              >
                {askState.status === "loading" ? (
                  <Loader2
                    size={16}
                    style={{ animation: "spin 0.8s linear infinite" }}
                  />
                ) : (
                  <Send size={16} />
                )}
                {askState.status === "loading" ? "Thinking…" : "Ask"}
              </button>
              {askState.status === "error" && <StatusLine state={askState} />}
            </div>

            {answer && (
              <div
                style={{
                  marginTop: 26,
                  background: "#F2ECDD",
                  color: "#232016",
                  borderRadius: 12,
                  padding: "24px 26px",
                  position: "relative",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 26,
                    width: 3,
                    height: "100%",
                    background: "#C89B4A",
                    borderRadius: 2,
                  }}
                />
                <div
                  className="sans"
                  style={{
                    fontSize: 11.5,
                    letterSpacing: "0.06em",
                    color: "#8A7A4E",
                    marginBottom: 10,
                    textTransform: "uppercase",
                  }}
                >
                  Answer
                </div>
                <div
                  style={{
                    fontSize: 16.5,
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {answer}
                </div>
              </div>
            )}

            {!answer && askState.status !== "loading" && (
              <div
                className="sans"
                style={{
                  marginTop: 26,
                  border: "1px dashed #2C3346",
                  borderRadius: 12,
                  padding: "30px",
                  textAlign: "center",
                  color: "#5C6273",
                  fontSize: 13,
                }}
              >
                Your answer will appear here once you ask a question.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusLine({ state }) {
  if (state.status === "idle" || !state.message) return null;
  const isError = state.status === "error";
  const Icon = isError ? XCircle : CheckCircle2;
  const color = isError ? "#D07A6E" : "#7FAE93";
  return (
    <span
      className="sans"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12.5,
        color,
      }}
    >
      <Icon size={14} />
      {state.message}
    </span>
  );
}
