import React from "react";

const SocialButton = (props) => {
  return (
    <a>
      <img className="social-button" src={props.src} alt={`${props.platform} icon`} />
    </a>
  );
};

export default SocialButton;
