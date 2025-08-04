import { useEffect, useState } from 'react';
import styles from '../styles.module.css';
import { showFormattedTime } from '../utils';

const Screen = (props) => {
  const [timeString, setTimeString] = useState();

  useEffect(() => {
    const time = showFormattedTime(
      props.hours,
      props.minutes,
      props.seconds,
      props.milliSeconds
    );
    setTimeString(time);
  }, [
    setTimeString,
    props.hours,
    props.minutes,
    props.seconds,
    props.milliSeconds,
  ]);

  return (
    <div className={styles.screen}>
      <h3>{timeString}</h3>
    </div>
  );
};

export default Screen;
