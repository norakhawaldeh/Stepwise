import logoT from '../../logo-t.png'

export default function AnimatedLogo() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200;300&display=swap');

        .logo-row {
          display: flex;
          align-items: baseline;
          font-family: 'Raleway', 'Outfit', 'Nunito', sans-serif;
          font-size: clamp(72px, 14vw, 88px);
          font-weight: 300;
          color: #FFFFFF;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .letter {
          opacity: 0;
          animation: fadeIn 0.35s ease-out forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .t-container {
          position: relative;
          display: inline-flex;
          align-items: baseline;
          width: .58em;
          height: .8em;
          overflow: visible;
        }

        .png-t {
          position: absolute;
          left: 30%;
          top: .55em;
          transform: translateX(-50%) scale(6);
          width: 9em;
          height: auto;
          opacity: 0;
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}</style>

      <div className="logo-row">
        <span className="letter" style={{ animationDelay: '0ms' }}>r</span>
        <span className="letter" style={{ animationDelay: '150ms' }}>o</span>
        <span className="letter" style={{ animationDelay: '300ms' }}>o</span>
        <div className="t-container">
          <img
            src={logoT}
            className="png-t"
            alt=""
            style={{ animationDelay: '450ms' }}
          />
        </div>
        <span className="letter" style={{ animationDelay: '950ms' }}>e</span>
        <span className="letter" style={{ animationDelay: '1100ms' }}>d</span>
      </div>
    </div>
  )
}