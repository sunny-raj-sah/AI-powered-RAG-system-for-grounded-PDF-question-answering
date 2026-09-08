 export default function Header() {
  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "white",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2
          style={{
            margin: 0,
            padding: "1px 1px",
            textAlign: "center",
            color: "black",
          }}
        >
          Book Q&A System
        </h2>

        <p style={{ margin: "2px 0 0", color: "#666" }}>
          AI-powered Document Question Answering
        </p>
      </header>
    </>
  );
}