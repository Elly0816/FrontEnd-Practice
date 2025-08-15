import { useEffect, useRef } from 'react';
import styles from '../styles.module.css';

//This components displays each split in the splits array that's passed in as a prop
const Splits = (props) => {
  const splitsRef = useRef(null);
  useEffect(() => {
    if (splitsRef.current) {
      splitsRef.current.scrollTop = splitsRef.current.scrollHeight;
    }
  }, [props.splits.length]);

  const shadow = props.splits.length > 0 ? 'shadow' : undefined;
  return (
    <div className={`${styles.splits} ${styles[shadow]}`} ref={splitsRef}>
      {props.splits.map((s, i) => (
        <div key={i} className={styles.split}>
          <h5>Split {i + 1}</h5>
          <h3>{s}</h3>
        </div>
      ))}
    </div>
  );
};

export default Splits;
