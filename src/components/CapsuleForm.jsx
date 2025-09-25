import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useIrysWallet from "../hooks/useIrysWallet";
import IrysSprite from "./Sprite";

// Footer is optional; keep import disabled until the component exists
// import Footer from "./Footer";

function CapsuleForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { walletStatus, irysStatus, connectWallet, connectIrys } = useIrysWallet();
  const [formData, setFormData] = useState({
    title: "",
  });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [receiptId, setReceiptId] = useState("");

  // Check if we have the required state
  useEffect(() => {
    if (!state?.tab || !state?.data) {
      setError("No data provided. Please go back and try again.");
    }
  }, [state]);

  // Helper: trigger a JSON file download in the browser
  // function downloadJSON(filename, jsonString) {
  //   const blob = new Blob([jsonString], { type: "application/json" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = filename;
  //   document.body.appendChild(a);
  //   a.click();
  //   a.remove();
  //   URL.revokeObjectURL(url);
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!state?.tab || !state?.data) {
      setError("No data available to save. Please go back and try again.");
      return;
    }

    const capsule = {
      title: formData.title || `My ${state.tab} Capsule`,
      createdAt: new Date().toISOString(),
      type: state.tab,
      items: state.data.map(item => item.name)

    };

    console.log("Capsule to save:", capsule);

    try {
      // Convert capsule to formatted JSON and download it
      const jsonString = JSON.stringify(capsule, null, 2);
      const result = await connectIrys(jsonString);
      if (result?.receipt?.id) {
        setReceiptId(result.receipt.id);
        setShowSuccess(true);
      }


    } catch (err) {
      console.error("Error saving capsule:", err);
      setError("Failed to save capsule. Please try again.");
    }
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#ff6b6b" }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            marginTop: "1rem",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            background: "#1db9a3",
            color: "white"
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", background: "#0d1f1f", color: "white", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "#1db9a3" }}>
        📦 Create Your {state?.tab === 'tracks' ? 'Top Tracks' : 'Top Artists'} Capsule
      </h2>

      
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <IrysSprite src="/sprite_1.png" width={85} top={12} right={12} opacity={0.9} /> 
               <IrysSprite src="/sprite_2.png" width={70} top={2} left={12} /> 
        
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
          <button
            type="button"
            onClick={connectWallet}
            disabled={walletStatus?.startsWith("Connected")}
            style={{
              padding: "8px 14px",
              borderRadius: 18,
              border: "none",
              cursor: walletStatus?.startsWith("Connected") ? "default" : "pointer",
              background: walletStatus?.startsWith("Connected") ? "#1a2f2f" : "#1db9a3",
              color: "white",
              flexShrink: 0
            }}
          >
            {walletStatus?.startsWith("Connected") ? "Wallet Connected" : "Connect Wallet"}
          </button>
          <span style={{ color: "#cce7e2", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {walletStatus}
          </span>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "#cce7e2" }}>
            Capsule Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={`My ${state?.tab || 'music'} capsule`}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #1db9a3",
              background: "#123232",
              color: "white"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: "1px solid #1db9a3",
              background: "transparent",
              color: "#1db9a3",
              cursor: "pointer",
              flex: 1
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: "#1db9a3",
              color: "white",
              flex: 1
            }}
          >
            Create Capsule
          </button>
        </div>
      </form>
      {/* Footer component can be added back when available */}
      {showSuccess && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            width: "90%",
            maxWidth: 480,
            background: "#0f2a2a",
            border: "1px solid #1db9a3",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            color: "#eafffb"
          }}>
            <h3 style={{ marginTop: 0, marginBottom: 8, color: "#1de9b6" }}>Capsule Uploaded 🎉</h3>
            <p style={{ marginTop: 0 }}>Your capsule was successfully uploaded to Irys.</p>
            <div style={{
              background: "#113535",
              border: "1px dashed #1db9a3",
              borderRadius: 8,
              padding: "10px 12px",
              wordBreak: "break-all",
              color: "#bff7ef",
              fontFamily: "monospace",
              fontSize: 13
            }}>
              Receipt ID: {receiptId}
            </div>
            <a
              href={`https://gateway.irys.xyz/${receiptId}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-block", marginTop: 12, color: "#7fffe1" }}
            >
              View on Irys Gateway ↗
            </a>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button
                onClick={() => setShowSuccess(false)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 20,
                  border: "1px solid #1db9a3",
                  background: "transparent",
                  color: "#1db9a3",
                  cursor: "pointer",
                  flex: 1
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  navigate(-1);
                }}
                style={{
                  padding: "10px 16px",
                  borderRadius: 20,
                  border: "none",
                  background: "#1db9a3",
                  color: "white",
                  cursor: "pointer",
                  flex: 1
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CapsuleForm;
