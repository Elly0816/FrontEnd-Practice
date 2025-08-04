import { useState } from 'react';
import styles from '../styles.module.css';

const Button = (props) => {
  const [isDown, setIsDown] = useState(false);
  const [isUp, setIsUp] = useState(true);
  return (
    <button
      onClick={() => {
        props.onClick();
      }}
      onMouseDown={() => {
        setIsDown(true);
        setIsUp(false);
      }}
      onMouseUp={() => {
        setIsUp(true);
        setIsDown(false);
      }}
      className={`${isDown && styles.addInsideShadow} ${isUp && styles.addOutsideShadow} ${props.style} ${
        styles.control
      }`}
    >
      {props.name}
    </button>
  );
};

export default Button;
