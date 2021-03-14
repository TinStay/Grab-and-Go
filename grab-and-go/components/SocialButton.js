import React from "react";
import Image from "next/image";
import classes from '../styles/Auth.module.scss'

const SocialButton = (props) => {
  return (
    <a className={classes.social_button}>
      <Image  src={props.src} width={65} height={65} alt={`${props.platform} icon`} />
    </a>
  );
};

export default SocialButton;
