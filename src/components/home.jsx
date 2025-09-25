import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IrysSprite from "./Sprite";



// CSS for the loader
const loaderStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '300px',
  gap: '20px'
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '5px solid #1a2f2f',
  borderTop: '5px solid #1db9a3',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Card animations and hover styles
const cardStyles = `
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes rotateSweep {
    to { transform: rotate(360deg); }
  }

  .music-card {
    background: #123232;
    padding: 15px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
    opacity: 0;
    animation: fadeInUp 500ms ease forwards;
    will-change: transform, box-shadow;
    position: relative;
    overflow: hidden;
  }

  /* Flowing white glow ring */
  .music-card::before {
    content: "";
    position: absolute;
    inset: -3px;
    border-radius: 18px;
    background: conic-gradient(
      from 0deg,
      rgba(255,255,255,0) 0deg,
      rgba(255,255,255,0.85) 90deg,
      rgba(255,255,255,0) 180deg,
      rgba(255,255,255,0.85) 270deg,
      rgba(255,255,255,0) 360deg
    );
    filter: blur(6px);
    opacity: 0.15; /* subtle idle glow */
    animation: rotateSweep 2.2s linear infinite;
    transition: opacity 200ms ease;
    pointer-events: none;
    z-index: 1;
  }

  .music-card:hover::before {
    opacity: 0.85; /* stronger glow on hover */
  }

  /* keep content above the glow layer */
  .music-card > * {
    position: relative;
    z-index: 2;
  }

  .music-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(255,255,255,0.08), 0 10px 20px rgba(0,0,0,0.45);
    background: #144040;
  }

  .music-card img {
    transition: transform 250ms ease;
  }

  .music-card:hover img {
    transform: scale(1.03);
  }
`;

function Home() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [data, setData] = useState([]);
  const [tab, setTab] = useState("tracks");
  const [saving, setSaving] = useState(false);
  const [txId, setTxId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    if (accessToken) {
      setToken(accessToken);
      fetchData(accessToken, tab);
    }
  }, [tab]);

  async function fetchData(token, type) {
    setLoading(true);
    try {
      const res = await fetch(`https://irys-music-capsule-backend.onrender.com//top-${type}?token=${token}`);
      const json = await res.json();
      setData(json.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  function login() {
    window.location.href = "https://irys-music-capsule-backend.onrender.com/login";
  }

 
  return (
    <div style={{ 
      padding: "2rem", 
      fontFamily: "Arial, sans-serif", 
      background: "#0d1f1f", 
      color: "white", 
      minHeight: "100vh",
      position: "relative"
    }}>
      <style>{cardStyles}</style>

      
     
     
      <IrysSprite src="../assets/sprite_2.png" width={85} top={12} right={12} opacity={0.9} />
      <IrysSprite src="../assets/sprite_2.png" width={70} top={2} left={12} />


      <h1 style={{
        textAlign: "center",
        marginBottom: "clamp(0.5rem, 2vw, 1.5rem)",
        color: "#1db9a3",
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        lineHeight: 1.2
      }}>
        🎶 Irys Music Capsule
      </h1>
      <p style={{ textAlign: "center", marginBottom: "2rem", color: "white" }}>Preserve your music memories on-chain forever</p>

      {!token && (
        <div style={{ textAlign: "center" }}>
          <button 
            onClick={login} 
            style={{
              padding: "12px 24px",
              background: "#1db9a3",
              color: "white",
              border: "none",
              borderRadius: "25px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Login with Spotify
          </button>
        </div>
      )}

      {token && (
        <div>
          {loading ? (
            <div style={loaderStyle}>
              <style>{keyframes}</style>
              <div style={spinnerStyle}></div>
              <p style={{ color: '#cce7e2', fontSize: '18px', margin: 0 }}>Loading your {tab}...</p>
            </div>
          ) : (
            <div>
              {/* Tabs */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                <button 
                  onClick={() => setTab("tracks")} 
                  style={{
                    padding: "10px 20px",
                    marginRight: "10px",
                    borderRadius: "20px",
                    border: "none",
                    cursor: "pointer",
                    background: tab === "tracks" ? "#1db9a3" : "#1a2f2f",
                    color: "white"
                  }}
                >
                  Top Tracks
                </button>
                <button 
                  onClick={() => setTab("artists")} 
                  style={{
                    padding: "10px 20px",
                    borderRadius: "20px",
                    border: "none",
                    cursor: "pointer",
                    background: tab === "artists" ? "#1db9a3" : "#1a2f2f",
                    color: "white"
                  }}
                >
                  Top Artists
                </button>
              </div>

          {/* Save Button */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <button
              onClick={() => navigate('/capsule', { state: { tab, data } })}
              disabled={saving || data.length === 0}
              style={{
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                background: "#1db9a3",
                color: "white",
                opacity: saving ? 0.6 : 1
              }}
            >{`Save ${tab} Snapshot to Irys`}
            </button>
          </div>



          {/* ✅ Grid */}
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px"
}}>
  {data.map((item, index) => (
    <div 
      key={item.id || index} 
      className="music-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* ✅ Cover image for tracks OR artists */}
      <img 
        src={
          tab === "tracks" 
            ? item.album?.images?.[0]?.url     // track: album cover
            : item.images?.[0]?.url            // artist: profile image
        } 
        alt={item.name} 
        style={{ width: "100%", borderRadius: "10px" }}
      />

      {/* ✅ Title */}
      <h3 style={{ margin: "10px 0 5px", fontSize: "16px", color: "#1db9a3" }}>
        {index + 1}. {item.name}
      </h3>

      {/* ✅ Subtitle (artists list for tracks, genres for artists) */}
      <p style={{ color: "#cce7e2", fontSize: "14px" }}>
        {tab === "tracks" 
          ? (item.artists?.map(a => a.name).join(", ") || "Unknown Artist") 
          : (item.genres?.slice(0, 2).join(", ") || "Artist")}
      </p>
    </div>
  ))}
</div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
