import React, { useState } from "react";
import "./Card.scss";

function Card(props) {
  const [isActive, setIsActive] = useState(false);
  let { fontFamily, bgColor } = props;

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  const genContrastColor = base => {
    var lum = (0.2126 * base[0] + 0.7152 * base[1] + 0.0722 * base[2]) / 255;
    return lum > 0.5 ? "black" : "white";
  };

  const rgb2hex = rgbArr => {
    var hexStr = "";

    rgbArr.forEach(c => {
      hexStr += c.toString(16).toUpperCase();
    });

    return hexStr;
  };

  const fontColor = genContrastColor(bgColor);

  const cardContent = isActive ? (
    <p className="fontSizeMedium">#{rgb2hex(bgColor)}</p>
  ) : (
    <div>
      <p className="fontSizeLarge">Atgp</p>
      <p className="fontSizeSmall">AaBb</p>
    </div>
  );

  return (
    <div className="card">
      <div
        className="card__body center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          fontFamily: fontFamily,
          color: fontColor,
          background: `rgb(${bgColor})`
        }}
      >
        {cardContent}
      </div>
      <div className="card__footer center">
        <span>Font</span>
        {fontFamily}
      </div>
    </div>
  );
}

export default Card;
