import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [msec, setMsec] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (timerId !== null) {
      const interval = setInterval(() => {
        setMsec((prevMsec) => {
          if (prevMsec === 99) {
            setSec((prevSec) => {
              if (prevSec === 59) {
                setMin((prevMin) => prevMin + 1);
                return 0;
              }
              return prevSec + 1;
            });
            return 0;
          }
          return prevMsec + 1;
        });
      }, 10);

      return () => clearInterval(interval);
    }
  }, [timerId]);

  const startTimer = () => {
    if (timerId === null) {
      setTimerId(true);
    }
  };

  const stopTimer = () => {
    setTimerId(null);
  };

  const resetTimer = () => {
    stopTimer();
    setMsec(0);
    setSec(0);
    setMin(0);
  };

  const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);

  return (<>
    <div className="App">
      <h1>Stopwatch</h1>
      <div id="timerDisplay">
        {formatTime(min)}:{formatTime(sec)}:{formatTime(msec)}
      </div>
      <button id="startBtn" onClick={startTimer}>
        Start
      </button>
      <button id="stopBtn" onClick={stopTimer}>
        Stop
      </button>
      <button id="resetBtn" onClick={resetTimer}>
        Reset
      </button>
    </div>
    </>
  );
}

export default App;
