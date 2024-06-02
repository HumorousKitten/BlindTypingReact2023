import React from "react";
import LevelBlock from "./LevelsBlock/LevelBlock";
import SimulatorStr from "./SimulatorStrBlock/SimulatorStr";
import ProgressBar from "./ProgressBar/ProgressBar";
import KeyBoardBlock from "./KeyboardBlock/KeyboardBlock";
import Usefulimgs from './UsefulImgs/Usefulimgs';
import ResultsAfterLvl from "../resultsAfterLvl/ResultsAfterLvl";
import cl from "./_SimulatorBlock.module.scss";

const SimulatorBlock = ({ server, transfer, setTransferData, token, startTimer, endTimer }) => {
  const [pressedKey, setPressedKey] = React.useState({
    correct: null,
    key: '',
  });

  const [transferStr, setTransferStr] = React.useState('');
  const [reset, setReset] = React.useState({});
  const [progressBar, setProgressBar] = React.useState(0);
  const mistakes = React.useRef([]);


  function deleteDublicatesOfArray(hasDublicates){
    let withoutDublicates = hasDublicates.filter((item, index) => {
      return hasDublicates.indexOf(item) === index;
    });
    return withoutDublicates
  }

  function nextLevel() {
    if (transfer.endTyping){
      startTimer.current = 0
			setTransferData((prev) => {
        return { ...prev, endTyping: false};
      });
		}

    if (!transfer.endTyping) {
      reset.reset();
    }
    
    if (transfer.levelId === 8 && transfer.subLevel === 3) {
      setTransferData((prev) => {
        return {...prev, levelId: 1, subLevel: 1 };
      });
      return;
    }
    if(transfer.levelId === 0 || transfer.subLevel === 3){
      setTransferData((prev) => {
        return {...prev, levelId: (prev.levelId += 1), subLevel: 1};
      });
      return
    }
    setTransferData((prev) => {
      return {...prev, levelId: prev.levelId, subLevel: prev.subLevel += 1 };
    });
  }


  if (!transfer.endTyping) {
    return (
      <div className={cl.MainContainer}>
        <LevelBlock transfer={transfer} />
        <SimulatorStr
          server={server}
          transfer={transfer}
          pressedKey={setPressedKey}
          transferStr={setTransferStr}
          reset={setReset}
          setTransferData={setTransferData}
          startTimer={startTimer}
          endTimer={endTimer}
        />
        <ProgressBar
          transfer={transfer}
          progress={pressedKey}
          transferStr={transferStr}
          results={{
            progressBar: progressBar,
            setProgressBar: setProgressBar,
          }}
        />
        <Usefulimgs reset={reset} nextLevel={nextLevel} />
        <KeyBoardBlock
          pressedKey={pressedKey}
          transferStr={transferStr}
          transfer={transfer}
          mistakes={mistakes}
          deleteDublicatesOfArray={deleteDublicatesOfArray}
        />
      </div>
    );
  } else {
    return (
      <div className={cl.MainContainer}>
        <ResultsAfterLvl
          transferStr={transferStr}
          mistakes={mistakes}
          transfer={transfer}
          server={server}
          token={token}
          deleteDublicatesOfArray={deleteDublicatesOfArray}
        >
          <LevelBlock
            transfer={transfer}
            style={{ position: 'relative', left: '20px', marginTop: '9px' }}
          />
          <ProgressBar
            transfer={transfer}
            progress={pressedKey}
            results={{
              progressBar: progressBar,
              setProgressBar: setProgressBar,
            }}
          />
        </ResultsAfterLvl>
        <Usefulimgs
          reset={reset}
          nextLevel={nextLevel}
        />
        <KeyBoardBlock
          pressedKey={pressedKey}
          transferStr={transferStr}
          transfer={transfer}
          mistakes={mistakes}
          deleteDublicatesOfArray={deleteDublicatesOfArray}
        />
      </div>
    );
  }
};
 
export default SimulatorBlock;