import React from "react";
import Image from "next/image";
// import moduleName from '../assets/images/'

const SocialButton = (props) => {
  return (
    <a className="social-button">
      <Image  src={props.src} width={80} height={80} alt={`${props.platform} icon`} />
    </a>
  );
};

export default SocialButton;
