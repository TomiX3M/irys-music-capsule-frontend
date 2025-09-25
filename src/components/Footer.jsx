import React from "react";

function Footer({ }) {
  return (
    <footer
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
       background: "linear-gradient(180deg, #176c6c 0%, #145454 100%)",
        borderTop: "1px solid #1db9a3",
        color: "#eafffb",
        padding: "10px 16px",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))",
        textAlign: "center",
        fontSize: 14,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>
        <span>
          Crafted by{' '}
          <a
            href="https://x.com/Cryptee03"
            style={{ color: "#1db9a3", textDecoration: "none", fontWeight: 600 }}
            onClick={(e) => {
              e.preventDefault();
              window.open('https://x.com/Cryptee03', '_blank');
            }}
          >
            Cryptee⚡
          </a>{' '}
          Built with<img
           src="/assets/irys_gif_logo.gif"
            alt="Irysify"
            style={{
              height: '2.50em',
              width: 'auto',
              display: 'inline-block',
              verticalAlign: 'middle',
              marginLeft: 0
            }}
          />
         
        </span>
    
      </div>
    </footer>
  );
}

export default Footer;
