import React, { useEffect } from "react";
import cl from "./_ProgressBar.module.scss";


const ProgessBar = ({ progress, transferStr, results, transfer }) => {
  const { correct, pressingKey, index } = progress;
  const { progressBar, setProgressBar } = results;
  const increasingBar = React.useRef(null)
  const STR_LENGTH = mathLength()

	

  useEffect(() => {
    increasingBar.current.style.width = progressBar + '%';
  }, [progressBar]);

  useEffect(() => {
    if (pressingKey === 'reset') {
      setProgressBar(0);
      return;
    }

    if (correct) {
      setProgressBar((prevData) => {
        return +(prevData + STR_LENGTH).toFixed(3);
      });
    }

    if (pressingKey === 'Backspace') {
      setProgressBar((prevData) => {
        return +(prevData - STR_LENGTH).toFixed(3);
      });
    }
  }, [pressingKey, index]);

  function mathLength() {
    if (!transferStr) return;
    return 100 / transferStr.length;
  }

  return (
    <div className={cl.TheMainestBar}>
      <div className={cl.SecondBar}></div>
      <div className={cl.IncreasingBar} ref={increasingBar}></div>
    </div>
  );
};

export default ProgessBar;