import { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; opacity: number; scale: number; hue: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ x: number; y: number; size: number; delay: number; hue: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const updateTrail = useCallback((x: number, y: number) => {
    setTrail(prevTrail => {
      const newTrail = [...prevTrail, { 
        x, 
        y, 
        opacity: 1, 
        scale: Math.random() * 0.5 + 0.5,
        hue: (Date.now() / 50) % 360 // Cycling through hues
      }];
      if (newTrail.length > 15) newTrail.shift();
      return newTrail.map((point, index) => ({
        ...point,
        opacity: (index + 1) / newTrail.length
      }));
    });

    // Add new sparkles occasionally
    if (Math.random() < 0.3) {
      setSparkles(prev => {
        const newSparkles = [...prev, {
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 0.5,
          hue: Math.random() * 60 + 30 // Gold hues between 30 and 90
        }];
        if (newSparkles.length > 10) newSparkles.shift();
        return newSparkles;
      });
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 300);
    
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      updateTrail(e.clientX, e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || 
          (e.target as HTMLElement).tagName === 'A' ||
          (e.target as HTMLElement).closest('button') ||
          (e.target as HTMLElement).closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseover', handleMouseOver);
      clearTimeout(timeout);
    };
  }, [updateTrail]);

  if (!isVisible) return null;

  return (
    <>
      {/* Magic wand cursor */}
      <div 
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%) rotate(45deg)', // Changed rotation to point right
          width: '24px',
          height: '24px'
        }}
      >
        {/* Wand handle */}
        <div 
          className="absolute bottom-0 left-1/2 w-1.5 h-6 rounded-full transform -translate-x-1/2"
          style={{
            background: 'linear-gradient(to bottom, rgb(147, 51, 234), rgb(79, 70, 229))',
            boxShadow: '0 0 4px rgba(147, 51, 234, 0.5)'
          }}
        />
        {/* Wand tip */}
        <div 
          className={`absolute bottom-6 left-1/2 w-2 h-2 transform -translate-x-1/2 rounded-full transition-all duration-300 ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
          style={{
            background: 'radial-gradient(circle, rgb(250, 204, 21) 0%, rgba(234, 179, 8, 0.8) 50%, rgba(234, 179, 8, 0) 100%)',
            boxShadow: `0 0 ${isHovering ? '20px' : '10px'} ${isHovering ? '10px' : '5px'} rgba(234, 179, 8, 0.8)`
          }}
        />
      </div>

      {/* Magical trail */}
      {trail.map((point, index) => (
        <div
          key={`trail-${index}`}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            transform: `translate(-50%, -50%) scale(${point.scale})`,
            width: '12px',
            height: '12px',
            background: `radial-gradient(circle, hsla(${point.hue}, 100%, 70%, 0.8) 0%, hsla(${point.hue}, 100%, 60%, 0) 70%)`,
            opacity: point.opacity * 0.7,
            filter: 'blur(1px)',
            transition: 'all 0.2s ease-out'
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle, index) => (
        <div
          key={`sparkle-${index}`}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animation: `sparkle 1s ease-out ${sparkle.delay}s`,
            background: `radial-gradient(circle, rgba(250, 204, 21, 1) 0%, rgba(234, 179, 8, 0.5) 50%, rgba(234, 179, 8, 0) 100%)`,
            borderRadius: '50%',
            opacity: 0,
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      <style>
        {`
          @keyframes sparkle {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          }
        `}
      </style>
    </>
  );
};

export default CustomCursor;
