import React from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './_LevellBlock.module.scss';

const SubLevels = ({searchSubLevel, completeSubLevels, index}) => {
	React.useEffect(()=>{
		if(completeSubLevels.length !== 0){
			completeSubLevels.forEach((item)=>{
					document.getElementById(index + "." + item.sublevel).style.background = '#0066FF';
			})
		}
	}, [completeSubLevels])
  return (
    <>
      <div
        style={{ borderRadius: '3px 0 0 3px', right: '0px' }}
        id={index + "." +1}
        onClick={searchSubLevel}
      ></div>
      <div className='subLevel' id={index + "." +2} onClick={searchSubLevel}></div>
      <div
        style={{ borderRadius: '0 3px 3px 0', left: '53px' }}
        id={index + "." +3}
        onClick={searchSubLevel}
      ></div>
    </>
  );
};

const LevelBlock = ({ index, value, svg, style, server, transfer, completedSubLevels}) => {
  const navigate = useNavigate();
	const [completeSubLevels, setCompleteSubLevels] = React.useState([]);
  async function searchSubLevel(event) {
    if(index !== 0){
      const subLevelId = event.currentTarget.id.slice(event.currentTarget.id.indexOf(".") + 1);
      transfer((actual) => {
        return {
          ...actual,
          levelId: (actual.levelId = index),
          subLevel: actual.subLevelId = parseInt(subLevelId, 10), 
          endTyping: false,
        };
      });
      navigate('/');
    }
  }

	React.useEffect(()=>{
		if (index !== 0 && completedSubLevels !== "nothing")
			setCompleteSubLevels((prev) => (prev = searchCompletedSubLevel(index)));
	}, [completedSubLevels])


	function searchCompletedSubLevel(level){
		const tmpArr = completedSubLevels.filter((item)=>{
			if(item.level === level) return item
			return null
		})
		return tmpArr
	}

  return (
    <div className={cl.lvlBlock} style={style} onClick={async () => {
      if(index === 0){
        const subLevel = await server.getLevel(index, 1);
        transfer((actual) => {
          return {
            ...actual,
            levelId: (actual.lvl = index),
            strLevel: (actual.strLevel = subLevel),
            endTyping: false,
          };
        });
        navigate('/');
      }
    }}>
      <div className={cl.infoOfLevel}>
        <span>{index}</span>
        <span>{value}</span>
        {svg}
      </div>

      <div className={cl.progressBlock}>
          {(index !== 0 && <SubLevels searchSubLevel={searchSubLevel} index={index} completeSubLevels = {completeSubLevels}/>)}
      </div>
    </div>
  );
};

export default LevelBlock;
