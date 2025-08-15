import { useEffect, useRef, useState } from 'react';
import styles from '../styles.module.css';
import Screen from './screen';
import Button from './button';
import {
  allZero,
  CONSTANTS,
  fromMilliToFormattedTime,
  fromTimeFormatToMilliSeconds,
  showFormattedTime,
} from '../utils';
import Splits from './splits';

/**
 *
 * @param {*} props
 * @returns jsx
 */

// NOTE: ms is actually centiseconds (cs). But we'll leave it as ms

const Container = (props) => {
  //Sets initial values
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliSeconds: 0,
  });
  const [timeInput, setTimeInput] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliSeconds: 0,
  });
  const [startTimeMilliSeconds, setStartTimeMilliSeconds] = useState(undefined);
  const [currentPlayPause, setCurrentPlayPause] = useState(CONSTANTS.PLAY);
  const [isCounting, setIsCounting] = useState(false);
  const [currentTimerActive, setCurrentTimerActive] = useState(false);
  const [durationPaused, setDurationPaused] = useState(0);
  const [timePaused, setTimePaused] = useState(undefined);
  // This hold the animatinFrame as a reference
  // const counter = useRef();
  const animationFrame = useRef();

  useEffect(() => {
    // This function handles updating the time state and any other state that it would depend on
    const update = () => {
      if (isCounting) {
        if (props.mode === CONSTANTS.STOPWATCH) {
          //Implement stopwatch mode
          const timeDiff = performance.now() - startTimeMilliSeconds - durationPaused;

          const formattedTime = fromMilliToFormattedTime(timeDiff);
          // console.log('This is the formatted time: ');
          // console.log(startTimeMilliSeconds);
          setTime((time) => ({
            ...time,
            hours: formattedTime.hours,
            minutes: formattedTime.minutes,
            seconds: formattedTime.seconds,
            milliSeconds: formattedTime.milliSecondsRemaining,
          }));
        } else if (props.mode === CONSTANTS.TIMER) {
          //Implement timer mode
          //Convert input to milliseconds
          const totalMilliseconds = fromTimeFormatToMilliSeconds(
            timeInput.hours,
            timeInput.minutes,
            timeInput.seconds,
            timeInput.milliSeconds
          );

          const timeDiff = performance.now() - startTimeMilliSeconds - durationPaused;

          const milliSecondsSet = fromTimeFormatToMilliSeconds(
            timeInput.hours,
            timeInput.minutes,
            timeInput.seconds,
            timeInput.milliSeconds
          );
          // console.log('milliseconds set: ' + milliSecondsSet);
          // console.log('Time diff: ' + timeDiff);

          // Convert to format that the time is shown in
          const formattedTime = fromMilliToFormattedTime(milliSecondsSet - timeDiff);
          setTime((time) => ({
            ...time,
            hours: formattedTime.hours,
            minutes: formattedTime.minutes,
            seconds: formattedTime.seconds,
            milliSeconds: formattedTime.milliSecondsRemaining,
          }));
          if (totalMilliseconds - timeDiff <= 0) {
            //TImer is done and the current time shown is 00:00:00:00
            animationFrame.current = requestAnimationFrame(() => resetFunc(true));
            return;
          }
        }
      }
      // recursively runs the update function on every frame
      animationFrame.current = requestAnimationFrame(update);
    };
    //runs the update function on every frame
    animationFrame.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [isCounting, props.mode]);

  // Handles starting the countdown/countup
  const start = () => {
    if (!currentTimerActive) {
      setStartTimeMilliSeconds(performance.now());
    }
    if (currentPlayPause === CONSTANTS.PLAY) {
      setIsCounting(true);
      if (currentTimerActive) {
        // Handles playing after being paused
        setDurationPaused(performance.now() - timePaused + durationPaused);
        console.log('Duration Paused: ' + durationPaused);
        cancelAnimationFrame(animationFrame.current);
      }
    } else {
      //Handles pause functionality
      setTimePaused(performance.now());
      setIsCounting(false);
      cancelAnimationFrame(animationFrame.current);
    }
    const value = currentPlayPause === CONSTANTS.PLAY ? CONSTANTS.PAUSE : CONSTANTS.PLAY;
    setCurrentPlayPause(value);
    setCurrentTimerActive(true);
  };

  //Resets the whole thing
  const resetFunc = (showAlert = false) => {
    setCurrentTimerActive(false);
    setIsCounting(false);
    setCurrentPlayPause(CONSTANTS.PLAY);
    setTime({ hours: 0, minutes: 0, seconds: 0, milliSeconds: 0 });
    setTimeInput({ hours: 0, minutes: 0, seconds: 0, milliSeconds: 0 });
    setDurationPaused(0);
    setTimePaused(undefined);
    props.clearSplit();
    if (showAlert) {
      alert('Timer Done!');
    }
    cancelAnimationFrame(animationFrame.current);
  };

  const reset = {
    name: CONSTANTS.RESET,
    func: resetFunc,
    style: styles.reset,
  };

  // Handles timer mode
  const timerModeFunctions = [
    {
      name: currentPlayPause,
      func: () => {
        if (allZero(timeInput)) {
          alert('You have to set values greater than zero!');
          return;
        }
        if (!currentTimerActive) {
          setTime((time) => ({
            ...time,
            hours: timeInput.hours,
            minutes: timeInput.minutes,
            seconds: timeInput.seconds,
            milliSeconds: timeInput.milliSeconds,
          }));
        }
        start();
        // setCurrentTimerActive(true);
      },
      style: currentPlayPause === CONSTANTS.PAUSE ? styles.pause : styles.play,
    },
    reset,
  ];

  //Handles stopwatch mode
  const stopWatchModeFunctions = [
    {
      name: currentPlayPause,
      func: () => {
        start();
      },
      style: currentPlayPause === CONSTANTS.PAUSE ? styles.pause : styles.play,
    },
    {
      name: CONSTANTS.SPLIT,
      func: () => {
        // handleSplit here
        props.addSplit(showFormattedTime(time.hours, time.minutes, time.seconds, time.milliSeconds));
      },
      style: styles['split-button'],
    },
    reset,
  ];

  const handleChange = (value, nameInput) => {
    //This handles the controlled time input in timer mode
    // setTimeInput();

    const name = nameInput.toLowerCase().includes('milli') ? 'milliSeconds' : nameInput.toLowerCase();
    setTimeInput((time) => ({ ...time, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.mode}>
        <button
          disabled={isCounting}
          className={styles['mode-button']}
          onClick={() => {
            setCurrentPlayPause(CONSTANTS.PLAY);
            props.toggleMode();
            resetFunc();
          }}
          title={`switch to ${
            props.mode === CONSTANTS.TIMER
              ? `${CONSTANTS.STOPWATCH.toLowerCase()} mode`
              : `${CONSTANTS.TIMER.toLowerCase()} mode`
          }`}
        >
          <h4>{props.mode}</h4>
        </button>
      </div>

      <Screen hours={time.hours} minutes={time.minutes} seconds={time.seconds} milliSeconds={time.milliSeconds} />

      <div className={styles['input-splits-container']}>
        {props.mode === CONSTANTS.TIMER ? (
          <div className={styles['timer-input']}>
            <div className={styles.input}>
              <label htmlFor="Hours">HR</label>
              <input
                value={timeInput.hours}
                inputMode="numeric"
                max={23}
                min={0}
                type="number"
                name="Hours"
                onChange={(e) => {
                  console.log(parseInt(e.target.value), e.target.name);
                  handleChange(parseInt(e.target.value), e.target.name);
                }}
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="Minutes">MIN</label>
              <input
                value={timeInput.minutes}
                inputMode="numeric"
                max={59}
                min={0}
                type="number"
                name="Minutes"
                onChange={(e) => {
                  handleChange(parseInt(e.target.value), e.target.name);
                }}
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="Seconds">SEC</label>
              <input
                value={timeInput.seconds}
                inputMode="numeric"
                max={59}
                min={0}
                type="number"
                name="Seconds"
                onChange={(e) => {
                  handleChange(parseInt(e.target.value), e.target.name);
                }}
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="Milliseconds">MS</label>
              <input
                value={timeInput.milliSeconds}
                inputMode="numeric"
                max={999}
                min={0}
                type="number"
                name="Milliseconds"
                onChange={(e) => {
                  handleChange(parseInt(e.target.value), e.target.name);
                }}
              />
            </div>
          </div>
        ) : (
          <Splits splits={props.splits} />
        )}
      </div>
      <div className={styles['button-container']}>
        {props.mode === CONSTANTS.TIMER
          ? timerModeFunctions.map((t, i) => <Button key={i} name={t.name} onClick={t.func} style={t.style} />)
          : stopWatchModeFunctions.map((t, i) => <Button key={i} name={t.name} onClick={t.func} style={t.style} />)}
      </div>
    </div>
  );
};

export default Container;
