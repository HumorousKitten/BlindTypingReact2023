import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import cl from "./_LevelBlock.module.scss";
import {HandySvg} from 'handy-svg';
import levelBook from '../../../img/icons/level_book.svg';

const LevelBlock = ({transfer, style}) => {
  const {levelId, subLevel} = transfer
  const navigate = useNavigate();
    return (
      <div
        className={cl.LevelBlock}
        onClick={() => navigate('/levels')}
        style={style}
      >
        <HandySvg
          src={levelBook}
          width='20'
          height='20'
          className={cl.svgBook}
        />
        <span>
          Уровень {" "}
          {levelId === 0 ? levelId : levelId + "." + subLevel}
        </span>
      </div>
    );
}
 
export default LevelBlock;