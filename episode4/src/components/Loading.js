import { useState, useEffect } from "react";

const messages = [
  "Finding the best restaurants near you...",
  "Checking today's specials...",
  "Almost ready to serve...",
  "Warming up your menu...",
];

export default function LoadingComponent() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(msgTimer);
  }, []);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(progressTimer);
  }, []);

  const dots = [
    { emoji: "🍕", top: "10%", left: "8%", delay: "0s", dur: "3.2s" },
    { emoji: "🍔", top: "15%", right: "10%", delay: "0.4s", dur: "2.8s" },
    { emoji: "🌮", top: "50%", left: "5%", delay: "0.8s", dur: "3.5s" },
    { emoji: "🍜", top: "70%", right: "7%", delay: "1.2s", dur: "3.0s" },
    { emoji: "🍣", top: "80%", left: "12%", delay: "0.2s", dur: "2.6s" },
    { emoji: "🥗", top: "35%", right: "5%", delay: "1.6s", dur: "3.8s" },
    { emoji: "🍰", top: "60%", left: "90%", delay: "0.6s", dur: "3.1s" },
    { emoji: "🥙", top: "25%", left: "50%", delay: "2.0s", dur: "4.0s" },
  ];

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden transition-colors">

      {/* Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200 dark:bg-orange-900 rounded-full opacity-40 -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 dark:bg-red-900 rounded-full opacity-50 translate-y-1/2 -translate-x-1/2 blur-2xl" />

      <style>{`
        @keyframes floatBob {
          0%,100%{transform:translateY(0px) rotate(-5deg);opacity:.18}
          50%{transform:translateY(-18px) rotate(5deg);opacity:.28}
        }
        @keyframes spin-slow{
          from{transform:rotate(0deg)}
          to{transform:rotate(360deg)}
        }
        @keyframes pulse-ring{
          0%{transform:scale(.8);opacity:.6}
          100%{transform:scale(1.6);opacity:0}
        }
        @keyframes fade-slide{
          0%{opacity:0;transform:translateY(8px)}
          20%{opacity:1;transform:translateY(0)}
          80%{opacity:1}
          100%{opacity:0;transform:translateY(-8px)}
        }
      `}</style>

      {/* Floating emojis */}
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute text-3xl pointer-events-none select-none"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            animation: `floatBob ${d.dur} ${d.delay} ease-in-out infinite`,
          }}
        >
          {d.emoji}
        </div>
      ))}

      {/* Card */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">

        {/* Spinner */}
        <div className="relative flex items-center justify-center w-32 h-32">
          <div className="absolute w-32 h-32 rounded-full border-4 border-orange-300 dark:border-orange-700 opacity-60"
            style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />

          <div className="absolute w-32 h-32 rounded-full border-4 border-orange-300 dark:border-orange-700 opacity-40"
            style={{ animation: "pulse-ring 1.8s ease-out 0.6s infinite" }} />

          <div className="absolute w-32 h-32"
            style={{ animation: "spin-slow 1.2s linear infinite" }}>
            <svg viewBox="0 0 128 128" className="w-full h-full">
              <circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="200 165"
              />
              <defs>
                <linearGradient id="arcGrad">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center">
            <span className="text-4xl">🍔</span>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">
            Mr. Food
          </h1>

          <div className="h-6 mt-2 overflow-hidden">
            <p
              key={msgIndex}
              className="text-orange-500 text-sm font-medium"
              style={{ animation: "fade-slide 1.5s ease-in-out forwards" }}
            >
              {messages[msgIndex]}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="w-64">
          <div className="w-full h-2 bg-orange-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-xs text-gray-400 dark:text-gray-300 mt-1 font-medium">
            {progress}%
          </p>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-400 to-red-500"
              style={{
                animation: `floatBob 0.8s ${i * 0.15}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <p className="absolute bottom-8 text-gray-400 dark:text-gray-300 text-xs tracking-widest uppercase font-medium">
        Good food is on its way ✦
      </p>
    </div>
  );
}