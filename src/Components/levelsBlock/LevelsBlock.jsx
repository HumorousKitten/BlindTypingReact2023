import React from "react";
import { useNavigate } from "react-router-dom";
import LevelBlock from "./LevelBlock/LevelBlock";
import { HandySvg } from 'handy-svg';
import cl from "./_LevelssBlock.module.scss";
import exit from "../../img/icons/close cross.svg";
import rightArrow from "../../img/icons/double.svg";

const LevelsBlock = ({server, transfer, token}) => {
    const levels = [
       "Test >>", 
       'F, J and U Keys',
       'D, E, K and I Keys',
       'S, W, L and O Keys',
       'G, T, H and Y Keys',
       'A, Q and P Keys',
       'R, B and N Keys',
       'V, M and C Keys',
       'X and Z Keys',
    ];
		const navigate = useNavigate();
		const [completedSubLevels, setCompletedSubLevels] = React.useState([]);

		React.useEffect(() => {
      (async () => {
        const completeSubLevels = await server.getUserLevels(token)
				setCompletedSubLevels(completeSubLevels)
      })();
    }, []);

		function toMainPage(){
			navigate("/")
		}

    return (
      <div className={cl.LevelsBlock}>
        <div className={cl.titleBLlock}>
            <h5>Выбор уровня</h5>
            <HandySvg src={exit} width='24' height='24' onClick = {toMainPage}  style={{position: "relative", left:"255px"}}/>
        </div>
       {levels.map((item, index) => {
          if(index === 0){
            return (
              <LevelBlock
                index={index}
                key = {index}
                value='Test'
                svg={<HandySvg src={rightArrow} width='24' height='24' />}
                style= {{marginBottom: "36px"}}
                server={server}
                transfer={transfer}
              />
            );
          }
          return (
            <LevelBlock
              key={index}
              index={index}
              value={item}
              server={server}
              transfer={transfer}
              completedSubLevels={completedSubLevels}
            />
          );
        })}
      </div>
    );
}
 
export default LevelsBlock;