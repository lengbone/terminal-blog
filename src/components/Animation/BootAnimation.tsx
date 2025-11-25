"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/config";

const bootMessages = [
  { text: "Initializing system...", delay: 0 },
  { text: "Loading kernel modules...", delay: 400 },
  { text: "Mounting file systems...", delay: 800 },
  { text: "Starting network services...", delay: 1200 },
  { text: "Loading blog components...", delay: 1600 },
  { text: "System ready.", delay: 2000 },
];

// 像素进度条组件
function PixelProgressBar({ progress }: { progress: number }) {
  const totalBlocks = 50;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="flex gap-[2px] justify-center mt-6">
      {Array.from({ length: totalBlocks }).map((_, i) => (
        <div
          key={i}
          className={`w-1 h-2 md:w-[5px] md:h-[10px] transition-colors duration-100 ${
            i < filledBlocks
              ? "bg-green-500"
              : "bg-gray-800"
          }`}
        />
      ))}
    </div>
  );
}

// 打字机效果组件
function TypeWriter({ 
  text, 
  speed = 40, 
  onComplete,
  showCursor = true,
}: { 
  text: string; 
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setDone(true);
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span>
      {displayText}
      {showCursor && !done && (
        <span className="animate-pulse text-green-500">▊</span>
      )}
    </span>
  );
}

export default function BootAnimation() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);

  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    if (!started) {
      setStarted(true);
    }
  };

  useEffect(() => {
    if (!started) return;

    const timers: NodeJS.Timeout[] = [];

    bootMessages.forEach((_, index) => {
      const timer = setTimeout(() => {
        setCurrentLine(index + 1);
        
        // 加载完成后自动进入
        if (index === bootMessages.length - 1) {
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setVisible(false), 500);
          }, 300);
        }
      }, bootMessages[index].delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [started]);

  // 服务端不渲染，避免水合错误
  if (!mounted || !visible) return null;

  const progress = (currentLine / bootMessages.length) * 100;
  const blogTitle = `${siteConfig.author.name}'s Blog`;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-4xl px-8">
        {!started ? (
          <div className="text-center py-12">
            {/* 打字机效果标题 */}
            <div className="text-green-500 text-3xl md:text-4xl font-bold mb-4 font-mono min-h-[48px]">
              <TypeWriter 
                text={blogTitle} 
                speed={60}
                onComplete={() => setTitleComplete(true)} 
              />
            </div>
            
            {/* 副标题 - 标题完成后打字机显示 */}
            {titleComplete && (
              <div className="text-gray-500 text-sm md:text-base mb-8 font-mono">
                <TypeWriter 
                  text={siteConfig.author.bio} 
                  speed={30}
                  showCursor={false}
                />
              </div>
            )}
            
            {/* 按钮 - 标题完成后显示 */}
            <div className={`transition-opacity duration-500 ${titleComplete ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={handleStart}
                disabled={!titleComplete}
                className="px-8 py-3 border border-green-500 text-green-500 font-mono text-sm hover:bg-green-500 hover:text-black transition-colors rounded"
              >
                <span className="text-gray-500">$</span> ./start.sh
              </button>
              <div className="mt-4 text-gray-600 text-xs animate-pulse font-mono">
                <TypeWriter text="Click to boot system..." speed={30} showCursor={false} />
              </div>
            </div>
          </div>
        ) : (
          <div className="font-mono text-xs md:text-sm space-y-1">
            {/* 命令提示符 */}
            <div className="text-gray-500 mb-3">
              <span className="text-green-500">$</span> ./start.sh
            </div>
            
            {bootMessages.slice(0, currentLine).map((msg, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-green-500">[OK]</span>
                <TypeWriter 
                  key={`msg-${index}`}
                  text={msg.text} 
                  speed={20} 
                  showCursor={false}
                />
              </div>
            ))}

            {currentLine < bootMessages.length && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 animate-pulse">[..]</span>
                <span className="text-gray-500">
                  <TypeWriter 
                    text={bootMessages[currentLine]?.text || ""} 
                    speed={25}
                  />
                </span>
              </div>
            )}

            {currentLine >= bootMessages.length && (
              <div className="mt-4 text-center">
                <div className="text-green-500 text-sm font-mono">
                  <TypeWriter text="Welcome! Entering system..." speed={40} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 像素风格进度条 */}
        {started && <PixelProgressBar progress={progress} />}
      </div>
    </div>
  );
}
