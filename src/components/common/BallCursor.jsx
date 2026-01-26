import { useRef, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const BallCursor = forwardRef(({ positionInitialCursor = { left: 0, top: 0, width: 0, height: 0 } }, ref) => {
  const ballCursorRef = useRef(null);
  const cursorSize = 32; // Tamaño del cursor en px

  useImperativeHandle(ref, () => ballCursorRef.current);

  useGSAP(() => {
    if (positionInitialCursor && ballCursorRef.current) {
      gsap.set(ballCursorRef.current, {
        x: positionInitialCursor.left + positionInitialCursor.width / 2 - cursorSize / 2,
        y: positionInitialCursor.top + positionInitialCursor.height / 2 - cursorSize / 2,
        opacity: 0,
      });

      gsap.to(ballCursorRef.current, {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          document.addEventListener('mousemove', handleMouseMove);
        }
      });
    }

    const handleMouseMove = (e) => {
      if (ballCursorRef.current) {
        gsap.to(ballCursorRef.current, {
          duration: 0.2,
          x: e.clientX - cursorSize / 2,
          y: e.clientY - cursorSize / 2,
          ease: "power2.out"
        });
      }
    };

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [positionInitialCursor]);

  return (
    <img
      ref={ballCursorRef}
      src="/images/Logo azul.png"
      alt=""
      className="fixed pointer-events-none z-50 top-0 left-0"
      style={{ width: cursorSize, height: cursorSize }}
    />
  );
});

BallCursor.displayName = 'BallCursor';

export default BallCursor;
