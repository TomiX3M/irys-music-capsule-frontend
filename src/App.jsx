import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CapsuleForm from "./components/CapsuleForm";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", paddingBottom: 56 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capsule" element={<CapsuleForm />} />
        </Routes>
      </div>
      <Footer text=" 2025 Irysify • Preserve your music memories on-chain" />
    </BrowserRouter>
  );
}
export default App;
// {/* <div align="center">
// -        <button onClick={connectWallet}>Connect Wallet</button>
// -        <p>{walletStatus}</p>
// -        <button onClick={connectIrys}>Connect Irys</button>
// -        <p>{irysStatus}</p>
// -      </div> */}