import { useRef, useState, useEffect } from "react";

// ─── SIMPLIFIED 3D-LIKE MANNEQUIN WITH CSS 3D TRANSFORMS ───
// This version uses CSS 3D for better compatibility
// Can be upgraded to Three.js later if needed

export default function VirtualTryOn3D({ 
  gender = "female", 
  bodyData = {}, 
  selectedTop = null, 
  selectedBottom = null,
  autoRotate = false,
  onModelReady
}) {
  const [isReady, setIsReady] = useState(false);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    setIsReady(true);
    if (onModelReady) {
      onModelReady();
    }
  }, [onModelReady]);

  // Handle mouse drag for rotation
  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startRotation = rotation;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      setRotation(startRotation + deltaX * 0.5);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Get color from clothing item
  const getColorFromItem = (item) => {
    if (!item) return "#8B7355";
    
    const name = item.name.toLowerCase();
    if (name.includes("black") || name.includes("dark")) return "#2d2d2d";
    if (name.includes("white") || name.includes("cream")) return "#f5f5dc";
    if (name.includes("blue") || name.includes("denim")) return "#4a6fa5";
    if (name.includes("red") || name.includes("burgundy")) return "#8b3a3a";
    if (name.includes("green") || name.includes("olive")) return "#6b7c5a";
    if (name.includes("pink") || name.includes("rose")) return "#d4a5b5";
    if (name.includes("yellow") || name.includes("gold")) return "#d4a95a";
    if (name.includes("purple") || name.includes("lavender")) return "#8b6b9e";
    if (name.includes("gray") || name.includes("grey")) return "#808080";
    if (name.includes("brown") || name.includes("tan")) return "#8b6f47";
    
    return "#8B7355";
  };

  const topColor = getColorFromItem(selectedTop);
  const bottomColor = getColorFromItem(selectedBottom);

  // Calculate body proportions
  const getBodyScale = () => {
    if (!bodyData.height || !bodyData.weight) return 1;
    const height = parseFloat(bodyData.height) || 165;
    return height / 165;
  };

  const bodyScale = getBodyScale();

  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#8b7355',
        fontSize: '0.9rem'
      }}>
        Loading Model...
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      style={{
        width: '100%',
        height: '100%',
        perspective: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        background: 'linear-gradient(135deg, #f0ece5 0%, #e8e4dc 100%)',
        borderRadius: '6px',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'relative',
        width: '200px',
        height: '400px',
        transformStyle: 'preserve-3d',
        transform: `scale(${bodyScale}) rotateY(${rotation}deg)`,
        transition: 'transform 0.1s ease-out'
      }}>
        {/* Head */}
        <div style={{
          position: 'absolute',
          width: '50px',
          height: '60px',
          background: '#d4a574',
          borderRadius: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '0'
        }} />

        {/* Neck */}
        <div style={{
          position: 'absolute',
          width: '30px',
          height: '20px',
          background: '#d4a574',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '55px'
        }} />

        {/* Torso */}
        <div style={{
          position: 'absolute',
          width: gender === 'female' ? '70px' : '80px',
          height: '100px',
          background: '#d4a574',
          borderRadius: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '70px'
        }} />

        {/* Top Clothing */}
        {selectedTop && (
          <div style={{
            position: 'absolute',
            width: gender === 'female' ? '75px' : '85px',
            height: '90px',
            background: topColor,
            borderRadius: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '75px',
            opacity: 0.9,
            transition: 'all 0.3s ease',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
          }}>
            {/* Clothing label */}
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              whiteSpace: 'nowrap'
            }}>
              {selectedTop.name}
            </div>
          </div>
        )}

        {/* Waist */}
        <div style={{
          position: 'absolute',
          width: gender === 'female' ? '50px' : '60px',
          height: '30px',
          background: '#d4a574',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '165px'
        }} />

        {/* Hips */}
        <div style={{
          position: 'absolute',
          width: gender === 'female' ? '75px' : '70px',
          height: '60px',
          background: '#d4a574',
          borderRadius: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '190px'
        }} />

        {/* Bottom Clothing */}
        {selectedBottom && (
          <div style={{
            position: 'absolute',
            width: gender === 'female' ? '75px' : '75px',
            height: '100px',
            background: bottomColor,
            borderRadius: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '185px',
            opacity: 0.9,
            transition: 'all 0.3s ease',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
          }}>
            {/* Clothing label */}
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              whiteSpace: 'nowrap'
            }}>
              {selectedBottom.name}
            </div>
          </div>
        )}

        {/* Left Arm */}
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '90px',
          background: '#d4a574',
          borderRadius: '10px',
          left: '50%',
          transform: 'translateX(-50%) rotate(10deg)',
          top: '75px',
          transformOrigin: 'top center'
        }} />

        {/* Right Arm */}
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '90px',
          background: '#d4a574',
          borderRadius: '10px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-10deg)',
          top: '75px',
          transformOrigin: 'top center'
        }} />

        {/* Left Leg */}
        <div style={{
          position: 'absolute',
          width: '28px',
          height: '110px',
          background: '#d4a574',
          borderRadius: '10px',
          left: '50%',
          transform: 'translateX(-35px)',
          top: '245px'
        }} />

        {/* Right Leg */}
        <div style={{
          position: 'absolute',
          width: '28px',
          height: '110px',
          background: '#d4a574',
          borderRadius: '10px',
          left: '50%',
          transform: 'translateX(7px)',
          top: '245px'
        }} />

        {/* Rotation hint */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          color: '#8b7355',
          opacity: 0.6,
          textAlign: 'center'
        }}>
          🖱️ Drag to rotate
        </div>
      </div>
    </div>
  );
}
