
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      // Update last position before setting new position
      setLastPosition({ x: position.x, y: position.y });
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Calculate direction
      const newDirection = {
        x: e.clientX - lastPosition.x,
        y: e.clientY - lastPosition.y
      };
      
      setDirection(newDirection);
      setIsMoving(true);
      
      // Reset moving state after a short delay
      clearTimeout(window.cursorTimeout);
      window.cursorTimeout = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      clearTimeout(window.cursorTimeout);
    };
  }, [position, lastPosition]);

  // Calculate cursor styles based on movement
  const getTrailStyles = () => {
    const magnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    const normalizedDirection = {
      x: direction.x / (magnitude || 1),
      y: direction.y / (magnitude || 1)
    };
    
    const trailLength = Math.min(magnitude * 0.5, 20);
    const trailAngle = Math.atan2(normalizedDirection.y, normalizedDirection.x);
    
    return {
      width: `${trailLength}px`,
      height: '8px',
      transform: `translate(-50%, -50%) rotate(${trailAngle}rad)`,
      opacity: isMoving ? 0.7 : 0
    };
  };

  return (
    <>
      <div 
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: 'white',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          opacity: 0.7
        }}
      />
      <div 
        className="fixed pointer-events-none z-50 bg-white rounded-full mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          ...getTrailStyles(),
          transition: 'opacity 0.1s'
        }}
      />
    </>
  );
};

export default CustomCursor;
