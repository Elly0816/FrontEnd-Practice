import { useState } from 'react';
import Container from './components/container';
import './App.css';
import styles from './styles.module.css';
import { CONSTANTS } from './utils';

// const modes = {
//   stopwatch: 'stopwatch',
//   timer: 'timer',
// };

function App() {
  const [mode, setMode] = useState(CONSTANTS.STOPWATCH);
  const [splits, setSplits] = useState([]);

  const handleToggleMode = () => {
    if (mode === CONSTANTS.STOPWATCH) {
      setMode(CONSTANTS.TIMER);
    } else {
      setMode(CONSTANTS.STOPWATCH);
    }
  };

  const addSplit = (currentSplit) => {
    setSplits([...splits, currentSplit]);
  };

  const clearSplit = () => {
    setSplits([]);
  };
  return (
    <>
      <div className={styles.main}>
        <Container
          mode={mode}
          toggleMode={handleToggleMode}
          addSplit={addSplit}
          clearSplit={clearSplit}
          splits={splits}
        />
      </div>
    </>
  );
}

export default App;
