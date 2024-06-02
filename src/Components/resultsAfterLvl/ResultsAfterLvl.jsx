import React from "react";
import cl from "./_ResultsAfterLvl.module.scss"

const ResultsAfterLvl = (props) => {
		const {transferStr, transfer, mistakes, server, token, deleteDublicatesOfArray} = props
    const {levelId, subLevel} = transfer
		const [CPM, setCPM] = React.useState(0);
		const [WPM, setWPM] = React.useState(0);
		const [accuracy, setAccuracy] = React.useState(0);

		React.useEffect(() => {
      if(transfer.time.seconds !== 0){
        const countOfCorrectCharacters = transferStr.length - mistakes.current.length;
        setCPM((prev) => {
          return Math.round(countOfCorrectCharacters / (transfer.time.minutes + transfer.time.seconds / 60));
        });
      }
    }, [transfer.time.seconds, transfer.time.minutes]);

		React.useEffect(() => {
      if(CPM !== 0){
				setWPM((prev) => Math.round(CPM / 5));
			}
    }, [CPM]);


    React.useEffect(() => {
      const ULTIMATE_ACCURACY = calculatingAccuracy();
			if (CPM && WPM && ULTIMATE_ACCURACY) {
        return () => {
          if(!subLevel){
            return () => {
              server.updateResultLevel(levelId, 1, token, CPM, WPM, ULTIMATE_ACCURACY);
            };
          }else{
            server.updateResultLevel(levelId, subLevel, token, CPM, WPM, ULTIMATE_ACCURACY);
          }
        };
      }
    }, [CPM, WPM])

    React.useEffect(() => {
        const ULTIMATE_ACCURACY = calculatingAccuracy();
        let counter = 0;
        const animate = setInterval(() => {
          if (counter === ULTIMATE_ACCURACY) {
            clearInterval(animate);
            return;
          }
          ++counter;
          setAccuracy((prev) => prev = counter);
        }, 90);
    }, []);


    React.useEffect(() => {
      let withoutDublicates = deleteDublicatesOfArray(mistakes.current);
      withoutDublicates.forEach((item) => {
        if (getId(item)) {
          if (getId(item).style.border !== '2px solid red')
            getId(item).style.border = '2px solid red';
        }
      });   
    }, [])


    function getId(elem) {
      return document.getElementById(elem);
    }

		function calculatingAccuracy() {
			return Math.round(100 - (100 / transferStr.length * mistakes.current.length))
		}


    return (
      <div className={cl.ResultsAfterLvl}>
        <div className={cl.numbersBlock}>
          <div>
            <span>{CPM}</span>
            <span>cpm</span>
          </div>
          <div>
            <span>
              {accuracy}<span className={cl.percent}>%</span>
            </span>
            <span>accuracy</span>
          </div>
          <div>
            <span>{WPM}</span>
            <span>wpm</span>
          </div>
        </div>
        {props.children[1]}
        {props.children[0]}
      </div>
    );
}
 
export default ResultsAfterLvl;