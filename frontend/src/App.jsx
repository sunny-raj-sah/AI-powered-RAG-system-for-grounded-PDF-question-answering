import BookQA from "./components/BookQA";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
  return (
  <div style={{ fontFamily: "Arial" }}>
  <Header />
      <div style={{ padding: "20px" }}>
    <BookQA />
  </div>

      <Footer />
    </div>
  );
}

export default App;
