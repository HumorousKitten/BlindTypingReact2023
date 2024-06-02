import React from "react";
import cl from "./_SimulatorStr.module.scss";


const SimulatorStr = ({server, transfer, pressedKey, transferStr, reset, setTransferData, startTimer, endTimer}) => {
  const [simulatorStr, setSimulatorStr] = React.useState('')
  const index = React.useRef(0)
  const tmpKeyNext = React.useRef('')
  const simulatorText = React.useRef(null)
	const hasEnd = React.useRef(false)
  

  React.useEffect(() => {
    (async ()=>{
      const str = await server.getLevel(transfer.levelId, transfer.subLevel)
      setSimulatorStr(str)
    })()
  }, [transfer.levelId, transfer.subLevel]);

  React.useEffect(() => {
    if (simulatorStr.length === 0) {
      return;
    }
    transferStr(simulatorStr);
    reset({ reset: resetStr });
    window.addEventListener('keydown', keyPressing);
    setTransferData((prev) => {
      return {
        ...prev,
        timerIsActive: (prev.timerIsActive = false),
        endTyping: (prev.endTyping = false),
      };
    });
    return () => {
      window.removeEventListener('keydown', keyPressing);
    };
  }, [simulatorStr]);

  React.useEffect(() => {
    if (index.current === 1 && !transfer.timerIsActive) {
      setTransferData((prevData) => {
        return {
          ...prevData,
          timerIsActive: true,
        };
      });
      startTimer.current = index.current
    }
    if (index.current === simulatorStr.length && simulatorStr.length !== 0) {
      setTransferData((prevData) => {
        return {
          ...prevData,
          timerIsActive: prevData.timerIsActive = false,
          endTyping: true,
        };
      });
      endTimer.current = true;
			hasEnd.current = true;
    }
  }, [index.current]);

  function addSpan() {
    return [...simulatorStr].map((letter, index) => (
      <span key={index} id={index}>
        {letter}
      </span>
    ));
  }

  function resetStr() {
    if (startTimer.current) {
      setTransferData((prev) => {
        return { ...prev, timerIsActive: (prev.timerIsActive = false) };
      });
    }

    startTimer.current = index.current = 0;

    if (endTimer.current) {
      setTransferData((prevData) => {
        return {
          ...prevData,
          endTyping: prevData.endTyping = false,
        };
      });
    }

		if (!hasEnd.current) {
      Array.from(simulatorText.current.children).forEach((item) => {
        if (item.style.color === 'white' || item.style.color === 'red') {
          item.style.color = 'rgba(255, 255, 255, 0.2)';
        }
      });
    }

    pressedKey((prevData) => {
      return {
        ...prevData,
        pressingKey: 'reset',
        requiredKey: transformToKeyCode(simulatorStr[index.current + 1]),
      };
    });
  }

  const keyPressing = (e) => {
    if (index.current === simulatorStr.length) return;

    if (
      e.key !== 'Backspace' &&
      e.key !== 'Alt' &&
      e.key !== 'Control' &&
      e.key !== 'Shift' &&
      e.key !== 'Tab' &&
      e.key !== 'Enter' &&
      e.key !== 'CapsLock' &&
      e.key !== 'Home' &&
      e.key !== 'Delete' &&
      e.key !== 'PageUp' &&
      e.key !== 'ArrowUp' &&
      e.key !== 'ArrowDown' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight' &&
      e.key !== 'PageDown' &&
      e.key !== 'Meta' &&
      e.key !== 'Escape'
    ) {
      equals(e.key, e.code, index.current);
      index.current += 1;
    }

    if (e.key === 'Backspace') {
      backSpace();
    }
  };

  function equals(key, code, index) {
    if (index < simulatorStr.length) {
      index + 1 < simulatorStr.length
        ? (tmpKeyNext.current = transformToKeyCode(simulatorStr[index + 1]))
        : (tmpKeyNext.current = transformToKeyCode(simulatorStr[index]));
      if (simulatorStr[index] === '\n' || simulatorStr[index] === '\r') key = simulatorStr[index];
      if (key !== simulatorStr[index]) {
        document.getElementById(index).style.color = 'red'
        pressedKey((prevData) => {
          return {
            correct: false,
            requiredKey: transformToKeyCode(simulatorStr[index]),
            pressingKey: code,
            keyNext: tmpKeyNext.current,
            index: index,
          };
        });
        return;
      }
      pressedKey((prevData) => {
        return {
          correct: true,
          requiredKey: transformToKeyCode(simulatorStr[index]),
          pressingKey: code,
          keyNext: tmpKeyNext.current,
          index: index,
        };
      });
      document.getElementById(index).style.color = 'white';
    }
  }

  function backSpace() {
    if (index.current === 0) {
      return;
    }
    if (index.current > 0) {
      document.getElementById(index.current - 1).style.color =
        'rgba(255, 255, 255, 0.2)';
      pressedKey((prevData) => {
        const newData = {
          pressingKey: 'Backspace',
          requiredKey: transformToKeyCode(simulatorStr[index.current - 1]),
          keyNext: transformToKeyCode(simulatorStr[index.current]),
          index: index.current - 1,
        };
        index.current -= 1;
        return newData;
      });
    }
  }

  function transformToKeyCode(symbol) {
    if (symbol === ' ' || symbol === '\r' || symbol === '\n') return 'Space';
    if (symbol === '`') return 'Backquote';
    if (symbol === '-') return 'Minus';
    if (symbol === '=') return 'Equal';
    if (symbol === '[') return 'BracketLeft';
    if (symbol === ']') return 'BracketRight';
    if (symbol === ';') return 'Semicolon';
    if (symbol === "'") return 'Quote';
    if (symbol === ',') return 'Comma';
    if (symbol === '.') return 'Period';
    if (symbol === '?') return 'Slash';
    if (!isNaN(symbol)) return 'Digit' + symbol;
    else {
      return 'Key' + symbol.toUpperCase();
    }
  }

  return (
    <div className={cl.SimulatorStrBlock}>
      <p className={cl.placeholder} ref={simulatorText}>
        {simulatorStr.length !== 0 && addSpan()}
      </p>
    </div>
  );
};
 
export default SimulatorStr;