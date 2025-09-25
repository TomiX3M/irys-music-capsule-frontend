import React from "react";

function IrysSprite({
  src,
  alt = "sprite",
  width = 56,
  top = undefined,
  right = undefined,
  bottom = undefined,
  left = undefined,
  opacity = 0.9,
  zIndex = 1,
  className,
  style,
}) {
  if (!src) return null;

  // Build positioning style dynamically
  const posStyle = {};
  if (typeof top !== 'undefined') posStyle.top = top;
  if (typeof bottom !== 'undefined' && typeof top === 'undefined') posStyle.bottom = bottom;
  if (typeof left !== 'undefined') posStyle.left = left;
  if (typeof right !== 'undefined' && typeof left === 'undefined') posStyle.right = right;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        position: "absolute",
        ...posStyle,
        width,
        height: "auto",
        opacity,
        pointerEvents: "none",
        zIndex,
        ...style,
      }}
    />
  );
}

export default IrysSprite;
