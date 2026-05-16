export default function AnimatedLogo() {
  return (
    <div className="rooted-logo-wrap">
      <style>{`
        .rooted-logo-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rooted-word {
          font-family: "Plus Jakarta Sans", system-ui, sans-serif;
          font-size: 64px;
          font-weight: 700;
          letter-spacing: -0.08em;
          color: #F7F7F2;
          text-shadow: 0 18px 40px rgba(0,0,0,0.35);
        }

        .logo-letter {
          opacity: 0;
          display: inline-block;
          transform: translateX(-14px);
          animation: letterIn 0.45s ease forwards;
        }

        .logo-letter:nth-child(1) { animation-delay: 0.25s; }
        .logo-letter:nth-child(2) { animation-delay: 0.45s; }
        .logo-letter:nth-child(3) { animation-delay: 0.65s; }
        .logo-letter:nth-child(4) { animation-delay: 0.95s; }
        .logo-letter:nth-child(5) { animation-delay: 1.2s; }
        .logo-letter:nth-child(6) { animation-delay: 1.4s; }

        .rooted-t {
          color: #A7D96C;
          position: relative;
          text-shadow:
            0 0 16px rgba(167,217,108,0.75),
            0 0 34px rgba(167,217,108,0.45);
        }

        .sprout {
          position: absolute;
          left: 50%;
          top: -28px;
          width: 42px;
          height: 52px;
          transform: translateX(-50%) scale(0);
          transform-origin: bottom center;
          animation: growSprout 0.9s ease-out 1.25s forwards;
        }

        .stem {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 4px;
          height: 48px;
          border-radius: 999px;
          background: linear-gradient(#B9EA7A, #6FAF3A);
          transform: translateX(-50%);
        }

        .leaf {
          position: absolute;
          width: 25px;
          height: 15px;
          border-radius: 999px 999px 999px 0;
          background: linear-gradient(135deg, #D9F5A4, #7DBE43);
          opacity: 0;
          animation: leafOpen 0.6s ease-out 1.75s forwards;
        }

        .leaf.left {
          left: 1px;
          top: 10px;
          transform-origin: right bottom;
          transform: rotate(-35deg) scale(0);
        }

        .leaf.right {
          right: 0;
          top: 4px;
          transform-origin: left bottom;
          transform: rotate(35deg) scale(0);
        }

        .spark {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #DDF7A7;
          box-shadow: 0 0 18px #C7F57D;
          opacity: 0;
          animation: sparkle 1.2s ease 1.2s forwards;
        }

        .spark.s1 { transform: translate(-80px, -20px); }
        .spark.s2 { transform: translate(95px, -10px); animation-delay: 1.45s; }
        .spark.s3 { transform: translate(60px, 35px); animation-delay: 1.65s; }

        .loading-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #B8C99A;
          opacity: 0.35;
          animation: dotPulse 1s ease-in-out infinite;
        }

        .delay-1 { animation-delay: 0.18s; }
        .delay-2 { animation-delay: 0.36s; }

        @keyframes letterIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes growSprout {
          0% {
            transform: translateX(-50%) scaleY(0);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%) scaleY(1);
            opacity: 1;
          }
        }

        @keyframes leafOpen {
          to {
            opacity: 1;
            transform: rotate(var(--rotate)) scale(1);
          }
        }

        .leaf.left { --rotate: -35deg; }
        .leaf.right { --rotate: 35deg; }

        @keyframes sparkle {
          0% { opacity: 0; scale: 0; }
          35% { opacity: 1; scale: 1; }
          100% { opacity: 0; scale: 1.8; }
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }
      `}</style>

      <div className="spark s1" />
      <div className="spark s2" />
      <div className="spark s3" />

      <h1 className="rooted-word">
        <span className="logo-letter">r</span>
        <span className="logo-letter">o</span>
        <span className="logo-letter">o</span>
        <span className="logo-letter rooted-t">
          t
          <span className="sprout">
            <span className="stem" />
            <span className="leaf left" />
            <span className="leaf right" />
          </span>
        </span>
        <span className="logo-letter">e</span>
        <span className="logo-letter">d</span>
      </h1>
    </div>
  )
}