import React from "react";
import cl from "./_Results.module.scss";


const Results = ({data}) => {
    const {server, token} = data;
    const [bestResults, setBestResults] = React.useState({
      level: "",
      subLevel: "",
      accuracy: 0,
      cpm: 0,
      wpm: 0,
    })

    React.useEffect(()=>{
      (async ()=>{
        const {accuracy, cpm, level, sublevel, wpm} = await server.getBestResult(token)
        setBestResults((prev) => {
          return {
            level: prev = level,
            subLevel: prev = sublevel,
            accuracy: prev = accuracy,
            cpm: prev = cpm,
            wpm: prev = wpm,
          };
        })
      })()
    }, [])

    return (
      <div className={cl.Results}>
        <div className={cl.bestBlock}>
          <span className={cl.bestResults}>Ваши лучшие результаты:</span>
          <span className={cl.lvl}>
            Уровень {bestResults.level}.{bestResults.subLevel}
          </span>
        </div>

        <div className={cl.numbersBlock}>
          <div>
            <span>
              {bestResults.accuracy}<span className={cl.percent}>%</span>
            </span>
            <span>accuracy</span>
          </div>
          <div>
            <span>{bestResults.cpm}</span>
            <span>cpm</span>
          </div>
          <div>
            <span>{bestResults.wpm}</span>
            <span>wpm</span>
          </div>
        </div>
      </div>
    );
}
 
export default Results;