import React from "react";
import cl from "./_Usefulimgs.module.scss";
const Usefulimgs = ({reset, nextLevel}) => {
    return (
      <div className={cl.Usefulimgs}>
        <div>
          <img
            src='images/icons/again_buttom.svg'
            alt='again'
            onClick={reset.reset}
          />
          <img
            src='images/icons/next_buttom.svg'
            alt='nextLevel'
            width='21'
            height='21'
            onClick={nextLevel}
          />
        </div>
        <div>
          <img src='images/icons/hands_buttom.svg' alt='switchHands' />
          <img src='images/icons/language_buttom.svg' alt='lang' />
        </div>
      </div>
    );
}
 
export default Usefulimgs;